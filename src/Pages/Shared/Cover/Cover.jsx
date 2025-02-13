import React from 'react';

const Cover = ({ img, titel, description }) => {
    return (
        <div
            className="hero h-[600px] bg-fixed"
            style={{
                backgroundImage: `url("${img}")`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="bg-[#4f4f4f] opacity-65 w-[85%] mx-auto text-neutral-content text-center h-40 flex flex-col justify-center items-center py-28">
                <div className="">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{titel}</h1>
                    <p className="mb-5 uppercase">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cover;
