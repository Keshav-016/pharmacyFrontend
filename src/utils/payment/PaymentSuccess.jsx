import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { userSocket } from '../../components/NavbarDefault';
import SuccessPay from '../../components/SuccessPay';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const total = queryParams.get('total');
    const paymentId = queryParams.get('paymentId').toUpperCase();
    const baseUrl = `http://localhost:3003`;
    const makeFinalOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'post',
                url: `${baseUrl}/final-order/add-order`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    quotationId: id
                }
            });
            userSocket.emit('acceptQuotation', rawData);
        } catch (e) {
            console.log(e);
        }
    };
    const handleClick = () => {
        makeFinalOrder();
        navigate('/meds');
    };

    return (
        <div className="flex justify-center items-center min-h-[100vh] my-auto">
            <div className=" z-2">
                <Confetti
                    width={width}
                    height={height}
                    tweenDuration={1000}
                    numberOfPieces={200}
                    recycle={true}
                />
            </div>
            <div className=" z-10  h-[100%] w-[100% sm:h-[50vh] sm:w-[80vw] lg:h-[50vh] lg:w-[50vw] bg-white  shadow-lg rounded-md px-5">
                <div className=" flex flex-col justify-center items-center w-[100%] my-4">
                    <div className=" h-[100px] w-[100px] ">
                        <SuccessPay />
                    </div>
                    <div className="  sm:text-[1.7rem] text-[1.5rem] font-bold font-default-font-family">
                        Payment Successful
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center font-medium sm:text-[1.2rem] font-default-font-family ">
                    <span className=" px-5">Thank you! </span>
                    <span>Your paymeny of Rs.{total} has been recieved.</span>
                    <div className=" flex flex-col  text-[0.9rem] justify-center items-center mt-4   ">
                        <span>ORDER ID: {id}</span>
                        <span>TRANSACTION ID: {paymentId}</span>
                    </div>

                    <button
                        onClick={handleClick}
                        className=" my-7 px-10 py-2 border bg-[#004E98] text-white rounded-sm"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
