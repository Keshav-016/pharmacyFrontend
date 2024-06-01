import React from 'react';
import animation from '../assets/animations/error.json';
import Lottie from 'react-lottie';

const ErrorPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="max-w-[400px] mx-auto my-5 bg-red ">
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default ErrorPage;
