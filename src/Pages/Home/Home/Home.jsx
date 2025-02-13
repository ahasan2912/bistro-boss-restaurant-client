import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BannerCall from "../Banner/BannerCall";
import BannerCard from "../Banner/BannerCard";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu.jsx/PopularMenu";
import Recommend from "../Recommends/Recommend";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <BannerCard></BannerCard>
            <PopularMenu></PopularMenu>
            <BannerCall></BannerCall>
            <Recommend></Recommend>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;