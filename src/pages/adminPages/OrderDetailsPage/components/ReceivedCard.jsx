import React from 'react';
import ReceivedOffer from './ReceivedOffer';
const ReceivedCard = (props) => {
    return (
        <>
            <div className=" border py-4 rounded-xl flex-col">
                <div className="flex gap-4 px-2">
                    <div className="h-[42px] w-[45px] bg-red-500 rounded-[50%]"></div>

                    <div className="w-[80%] m-auto">
                        <h2>{props.pharmaName}</h2>

                        <div className="flex gap-4 mt-3">
                            <h3 className="font-bold">&#8377;{props.price}</h3>
                            <p className="text-blue-600 text-xs mt-1">
                                <span>Discount </span> {props.discount}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className=" border-t-[0.010rem] flex justify-center gap-2 mt-5 pt-3 px-3">
                    <p className="font-bold">
                        <span className="font-light text-gray-400">
                            Delivery date
                        </span>
                        {props.deliveryDate}
                    </p>
                    <p>
                        <span>before</span>
                        {props.time}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ReceivedCard;
