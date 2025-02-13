import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, titel, coverImg }) => {
    return (
        <div>
            {
                titel && coverImg ? <Cover img={coverImg} titel={titel} description={'Would you like to try dish?'}></Cover> : ''
            }
            <div className="grid md:grid-cols-2 gap-5 my-10">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='my-5 text-center'>
                <Link to={`/order/${titel}`}>
                    <button className="btn btn-lg rounded-lg btn-outline border-0 border-b-4 uppercase">ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;