import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
// Import Swiper styles
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-server-silk-iota.vercel.app/review')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
    return (
        <div className=''>
            <SectionTitle subHeading={'What our Clinet Say'} heading={'Testimonials'}></SectionTitle>
            <div className='my-16'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className='px-14 text-center flex flex-col items-center gap-2'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <div className="my-6">
                                    <FaQuoteLeft size={50} />
                                </div>
                                <p>{review.details}</p>
                                <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;