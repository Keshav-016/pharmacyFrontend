import React from 'react';
import Lottie from 'react-lottie';
import animation from '../assets/animations/successPayment.json';

const SuccessPay = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} />;
};

export default SuccessPay;
