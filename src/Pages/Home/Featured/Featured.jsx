import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredImage from '../../../assets/home/featured.jpg';
import './featured.css'
const Featured = () => {
    return (
        <div className='featured-item my-10 bg-fixed'>
            <SectionTitle subHeading={'Check it out'} heading={'From out menu'}></SectionTitle>
            <div className='md:flex justify-center items-center gap-5 py-8 px-36'>
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className='text-white'>
                    <p>Aug 20, 2025</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo sapiente, quos harum odio provident, nesciunt reprehenderit possimus praesentium earum odit blanditiis velit magnam, maiores aliquam inventore aut facilis illum neque iste veniam accusamus. Ea, amet. Rem harum consectetur eligendi vitae, minima temporibus sunt, eius unde animi dolorum velit. Ad, non!</p>
                    <div className='my-5 text-left'>
                        <button className="btn btn-lg rounded-lg btn-outline border-0 border-b-4 uppercase">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;