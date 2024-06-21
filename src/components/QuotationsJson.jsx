import React from 'react';
import Lottie from 'react-lottie';
import animation from '../assets/animations/noQuotationsjson.json';

const QuotationsJson = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className=" md:w-[50vh] lg:w-[100%] flex justify-center items-center">
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default QuotationsJson;
