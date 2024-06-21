import React from 'react';
import Lottie from 'react-lottie';
import animation from '../assets/animations/failedPayment.json';

const FailedPay = () => {
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

export default FailedPay;
