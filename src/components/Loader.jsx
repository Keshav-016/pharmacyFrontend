import React from 'react';
import animation from '../assets/animations/loaderJson.json';
import Lottie from 'react-lottie';

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className=" h-[90vh] bg-[#EBF6F9] flex justify-center items-center">
            <div className="max-w-[50vh]">
                <Lottie options={defaultOptions} />
            </div>
        </div>
    );
};

export default Loader;
