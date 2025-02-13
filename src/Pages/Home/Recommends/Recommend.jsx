import { useEffect, useState } from "react";
import MenuCard from "../../../Components/MenuCard/MenuCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const Recommend = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-server-silk-iota.vercel.app/menu')
            .then(res => res.json())
            .then(data => {
                const saladItems = data.filter(item => item.category === 'salad');
                setMenu(saladItems);
            })
    }, [])
    return (
        <div>
            <SectionTitle subHeading={'Should Try'} heading={'Chef Recommends'}></SectionTitle>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                {
                    menu.slice(1).map(item => <MenuCard key={item._id} item={item}></MenuCard>)
                }
           </div>
        </div>
    );
};

export default Recommend;