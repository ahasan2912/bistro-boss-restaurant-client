import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }
    return (
        <div>
            <div className="flex items-center justify-evenly">
                <h2 className="text-4xl font-semibold">Items: {cart.length}</h2>
                <h2 className="text-4xl font-semibold">Total Price: ${totalPrice}</h2>
                {
                    cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-primary">Pay</button>
                </Link> : <button disabled className="btn btn-primary">Pay</button>
                }
                
            </div>
            <div className="overflow-x-auto w-full rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead className='bg-base-200'>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => <tr key={item._id}>
                            <th>
                                <p>{idx + 1}</p>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={item.image}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>${item.price}</td>
                            <th>
                                <button onClick={() => handleDelete(item._id)} className="btn btn-lg btn-ghost">
                                    <FaTrash className='text-orange-400'></FaTrash>
                                </button>
                            </th>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;