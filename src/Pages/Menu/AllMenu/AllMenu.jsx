import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImage from '../../../assets/menu/banner3.jpg'
import MenuCard from '../../../Components/MenuCard/MenuCard';
import useMenu from '../../../Hooks/useMenu';
const AllMenu = () => {
    const [menu] = useMenu();
    return (
        <div>
            <Helmet>
                <title>Bistro | AllMenu</title>
            </Helmet>
            <Cover img={menuImage} titel={'Our menu'} description={'Would you like to try dish?'}></Cover>
            <h1 className=' text-center my-5 font-semibold text-5xl'>All Menu Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                {
                    menu.slice(1).map(item => <MenuCard key={item._id} item={item}></MenuCard>)
                }
            </div>
        </div>
    );
};

export default AllMenu;