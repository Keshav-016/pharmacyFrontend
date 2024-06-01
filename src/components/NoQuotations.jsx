import React from 'react';
import Lottie from 'react-lottie';
import animation from '../assets/animations/noQuotationsjson.json'

const NoQuotations = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
            <div className="max-w-[80vh]">
                <Lottie options={defaultOptions} />
            </div>
    );
};

export default NoQuotations;
