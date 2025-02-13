import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const MenuCard = ({ item }) => {
    const { user } = useAuth();
    const { name, recipe, image, price, _id } = item || {};
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = food => {
        if (user && user?.email) {
            // send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user?.email,
                name,
                image, 
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire("Added to your carts");
                }
                refetch();
            })
        }
        else {
            Swal.fire({
                title: "Please login to add to the cart?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the login page
                    navigate('/login', {state: {from: location}});
                    /* Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    }); */
                }
            });
        }
    }
    return (
        <div className="border relative flex flex-col items-center text-center">
            <img src={image} alt="" />
            <p className='bg-slate-900 text-white absolute top-3 right-5 rounded px-2 py-1'>${price}</p>
            <div className="pt-5 px-2 flex-grow">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p>{recipe}</p>
            </div>
            <div className='my-5 text-center'>
                <button onClick={() => handleAddToCart(item)} className="btn btn-lg rounded-lg btn-outline border-0 border-b-4 uppercase">Add To Cart</button>
            </div>
        </div>
    );
};

export default MenuCard;
