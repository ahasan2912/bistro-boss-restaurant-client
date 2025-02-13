import React from 'react';
import banner from '../../../assets/home/chef-service.jpg'
const BannerCard = () => {
    return (
        <div className='w-full bg-center bg-cover bg-no-repeat h-[50vh] md:h-[50vh] my-10' style={{ backgroundImage: `url(${banner})`}}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/30 '>
                <div className='px-2 space-y-1 bg-white w-3/4 mx-auto py-14 text-black text-center'>
                    <h1 className='text-3xl font-semibold  md:text-5xl uppercase'>Bistro Boss</h1>
                    <p className='text- md:text-base w-full px-10 mx-auto text-justify md:text-center max-w-7xl mt-4'>Pastaria is the newest pasta house in Bangladesh. Unique in its own kind, it's dedicated 100% in the making of fresh pasta accompanied by a variety of delicious sauces made with carefully chosen ingredients. We bring to you the best tastes, in full portions and reasonable prices! We see pasta as art, and we treat it as such. We never forget to add plenty of love and fantasy to our dishes!</p>
                </div>
            </div>
        </div>
    );
};

export default BannerCard;