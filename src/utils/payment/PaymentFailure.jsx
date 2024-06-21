import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useNavigate } from 'react-router-dom';
import FailedPay from '../../components/FailedPay';

const PaymentFailure = () => {
    const navigate = useNavigate();
    const total = queryParams.get('total');

    return (
        <div className="flex justify-center items-center min-h-[100vh] my-auto bg-[#004E98]">
            <div className=" z-10  w-[100%] sm:w-[80vw]  lg:w-[50vw] bg-white  shadow-lg rounded-md px-5">
                <div className=" flex flex-col justify-center items-center w-[100%] my-4">
                    <div className=" h-[150px] w-[150px] ">
                        <FailedPay />
                    </div>
                    <div className=" text-[1.5rem] font-bold font-default-font-family">
                        Payment Failed
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center font-semibold sm:text-[1rem] font-default-font-family ">
                    <span className=" px-5">Sorry! </span>
                    <span>We could not process the paymeny of Rs.{total}</span>

                    <button
                        onClick={() => navigate('/user-profile/order')}
                        className=" my-7 px-10 py-2 border bg-[#004E98] text-white rounded-sm"
                    >
                        RETRY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
