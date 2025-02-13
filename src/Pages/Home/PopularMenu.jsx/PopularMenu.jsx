import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <div className="my-10">
            <section>
                <SectionTitle heading={'From Our Menu'} subHeading={'Popular Items'}></SectionTitle>
            </section>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='my-5 text-center'>
                <button className="btn btn-lg rounded-lg btn-outline border-0 border-b-4">Order Now</button>
            </div>
        </div>
    );
};

export default PopularMenu;