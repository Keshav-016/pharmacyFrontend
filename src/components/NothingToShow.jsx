import React from 'react';
import Lottie from 'react-lottie';
import animation from '../assets/animations/nothingToShowJson.json';

const NothingToShow = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className=" bg-[#EBF6F9] flex justify-center items-center">
            <div className="max-w-[80vh]">
                <Lottie options={defaultOptions} />
            </div>
        </div>
    );
};

export default NothingToShow;
