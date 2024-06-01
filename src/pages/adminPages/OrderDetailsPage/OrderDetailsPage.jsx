import React from 'react';

import ReceivedOffer from './components/ReceivedOffer.jsx';

const OrderDetailsPage = () => {
    return (
        <>
            <div className="bg-blue-100 py-5 flex  w-[100vw] md:h-[100vh]">
                <div className="  w-[100vw] m-auto flex  gap-5 flex-col  md:flex-row md:w-[80vw]">
                    <div className=" border rounded-2xl p-5 mt-5  bg-white w-[100vw] md:w-[60vw] ">
                        <h2 className="text-2xl">Order Details</h2>

                        <div className="flex justify-between border  rounded-2xl p-3 mt-3 bg-[#F5F5F5] ">
                            <div className="flex  flex-col gap-2">
                                <h6 className="text-xs text-[#737A83]">
                                    Order ID
                                </h6>
                                <h6>398557754923892736</h6>
                            </div>

                            <div className="flex justify-between flex-col">
                                <h6 className="text-xs text-[#737A83]">
                                    Placed on
                                </h6>
                                <div className="flex justify-between gap-5">
                                    <h6>
                                        Feb 14,2024 <span> 12:14pm</span>
                                    </h6>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <h3 className="text-lg">
                                    Angela Allen{' '}
                                    <span className="text-xs text-[#737A83]">
                                        {' '}
                                        (Customer Name)
                                    </span>
                                </h3>
                                <button className="border rounded-md text-xs p-2 px-5 bg-[#F11F52] text-white font-semibold">
                                    New Order
                                </button>
                            </div>
                            <div className="mt-3 flex flex-col gap-3 text-sm">
                                <div className="flex justify-between">
                                    <h5 className="text-sm">
                                        {' '}
                                        Levera 500mg Strip Of 15 Tablets
                                        <span className="text-xs text-[#737A83] px-6">
                                            QTY: 2
                                        </span>
                                    </h5>
                                    <div className="flex gap-6 ">
                                        <h6 className="text-xs text-[#737A83]">
                                            Available
                                        </h6>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <h5>
                                        {' '}
                                        Rejunex Plus Nf Strip Of 10 Capsules
                                        <span className="text-xs text-[#737A83] px-6">
                                            QTY: 2
                                        </span>
                                    </h5>
                                    <div className="flex gap-6">
                                        <h6 className="text-xs text-[#737A83]">
                                            Available
                                        </h6>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <h5>
                                        Cognivel Strip Of 10 Tablets{' '}
                                        <span className="text-xs text-[#737A83] px-6">
                                            QTY: 2
                                        </span>
                                    </h5>
                                    <div className="flex gap-6">
                                        <h6 className="text-xs text-[#737A83]">
                                            Available
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h5 className=" text-[#1444EF] text-sm  py-6 underline ...">
                            Add More <span className="">+</span>
                        </h5>

                        <div className="flex justify-evenly flex-wrap md:flex-nowrap">
                            <div className="flex flex-col gap-2 order-1 md:w-[33%] [w-50%]">
                                <h5 className="text-xs text-[#737A83]">
                                    MRP Total:
                                </h5>
                                <h3 className="text-lg">&#8377;1344.00</h3>
                            </div>

                            <div className="flex flex-col gap-2 order-3 md:order-2 md:w-[33%] w-[100%] justify-center ">
                                <h5 className="text-xs text-[#737A83]">
                                    Shipping Address:
                                </h5>
                                <p className="w-[70%] text-sm">
                                    Webel STP 2 Building, DN-53, Salt Lake, Sec
                                    5, Kolkata 700091.
                                </p>
                                <h5 className="text-sm">+91 1234567890</h5>
                            </div>

                            <div className="flex flex-col gap-2 order-2 md:order-3 md:w-[33%] md:[w-50%]">
                                <h5 className="text-xs text-[#737A83]">
                                    Prescriptions Uploaded:
                                </h5>
                                <div className="flex  align-middle justify-center gap-6 ">
                                    <div className="h-[42px] w-[45px] bg-red-500 rounded-lg"></div>
                                    <div className="h-[42px] w-[45px] bg-red-500 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[100vw] md:w-[40vw] ">
                        <div className="mx-5 ">
                            <ReceivedOffer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsPage;
