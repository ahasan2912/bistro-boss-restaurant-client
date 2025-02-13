import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import menuImage from '../../../src/assets/menu/banner3.jpg'
import PopularMenu from '../Home/PopularMenu.jsx/PopularMenu';
import dessertImg from '../../../src/assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../src/assets/menu/pizza-bg.jpg';
import saladImg from '../../../src/assets/menu/salad-bg.jpg';
import soupImg from '../../../src/assets/menu/soup-bg.jpg';
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import MenuItem from '../Shared/MenuItem/MenuItem';
import MenuCategory from './MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const offered = menu.filter(item => item.category === 'offered');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuImage} titel={'Our menu'} description={'Would you like to try dish?'}></Cover>
            <SectionTitle heading={`Today's offer`} subHeading={`Don't miss`}></SectionTitle>
            <MenuCategory items={offered} titel={'offered'}></MenuCategory>
            <MenuCategory items={dessert} titel={'dessert'} coverImg={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} titel={'pizza'} coverImg={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} titel={'salad'} coverImg={saladImg}></MenuCategory>
            <MenuCategory items={soup} titel={'soup'} coverImg={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;