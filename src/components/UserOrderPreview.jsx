import React from 'react';
import { GoTriangleRight } from 'react-icons/go';

const UserOrderPreview = ({ subHeading, userOrder }) => {
    let total = 0;
    userOrder?.medicines.map((meds) => {
        total = total + Number(meds?.medicineId?.price);
        total = parseFloat(total.toFixed(2));
    });

    const sampleObj = {
        deliveredOn: 'Dec 27, 12:35 pm',
        sellersName: 'LINUX LABORATORIES',
        deliveryCharges: '50',
        handlingCharges: '₹50.0',
        discount: '- ₹173.01 (30%)',
        total: '₹1579.84'
    };

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 ]">
                <h1 className="lg:text-3xl md:text-[1.5rem] text-[1.4rem]  font-default-font-family text-semibold">
                    {subHeading}
                </h1>
                <div className="flex flex-col gap-0">
                    <div className=" flex sm:flex-row flex-col gap-2 sm:gap-0 justify-between font-default-font-family bg-gray-bg my-5 sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem] bg-[#e1e1e1]">
                        <div className="flex flex-col ">
                            <span className=" text-[#848a8f]">OrderID</span>
                            <span>{userOrder?._id}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className=" text-[#848a8f]">Placed On</span>
                            <span>{userOrder?.createdAt.slice(0, 10)}</span>
                        </div>
                    </div>

                    <div className="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start gap-3 sm:gap-0 font-default-font-family sm:p-2 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                        {userOrder?.status !== 'pending' ? (
                            <>
                                <div className="flex flex-col ">
                                    <span className=" text-[#848a8f]">
                                        Delivered On
                                    </span>
                                    <span>{sampleObj.deliveredOn}</span>
                                </div>
                                <div className="flex flex-col ">
                                    <span className=" text-[#848a8f] ">
                                        Seller Name
                                    </span>
                                    <span>{sampleObj.sellersName}</span>
                                </div>
                            </>
                        ) : (
                            ''
                        )}

                        {userOrder?.status === 'pending' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#E47917] text-white rounded-md text-[0.9rem]">
                                {userOrder?.status}
                            </div>
                        )}
                        {userOrder?.status === 'accepted' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#C6791F] text-white rounded-md text-[0.9rem]">
                                {userOrder?.status}
                            </div>
                        )}
                        {userOrder?.status === 'delivered' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#1DAD23] text-white rounded-md text-[0.9rem]">
                                {userOrder?.status}
                            </div>
                        )}
                    </div>

                    <div>
                        <ul className="sm:p-2 pb-5 text-[0.9rem]">
                            {userOrder?.medicines?.map((item) => (
                                <div
                                    key={item?.medicineId?._id}
                                    className=" font-default-font-family mt-3  text-gray-500 list-disc text-[0.7rem] sm:text-[0.9rem]"
                                >
                                    <li className=" flex items-center gap-3">
                                        <GoTriangleRight />
                                        {item?.medicineId?.name}
                                        <span className="sm:ms-20  ms-3">
                                            QTY :{item?.quantity}
                                        </span>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-12 items-start justify-center font-default-font-family sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem] w-[100%]">
                        <div className="flex flex-col  sm:col-span-3 col-span-12 sm:w-[80%] w-[100%]">
                            <span className=" text-[#848a8f]">
                                Shipment Total:
                            </span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex flex-col sm:col-span-4 col-span-12 py-2 ">
                            <span className=" text-[#848a8f]">
                                Shipment Address:
                            </span>
                            <div>
                                {userOrder?.address?.building},
                                {userOrder?.address?.area},
                                {userOrder?.address?.city},
                                {userOrder?.address?.state},
                                {userOrder?.address?.country}, Pin -{' '}
                                {userOrder?.address?.postcode}
                            </div>
                        </div>

                        <div
                            className={`${userOrder?.prescriptions.length > 0 ? 'flex flex-col sm:col-span-4 col-span-12 mt-3 sm:mt-0 text-[#848a8f] px-2' : 'flex flex-col sm:col-span-4 text-gray-300 col-span-12 mt-3 sm:mt-0'}`}
                        >
                            <span>
                                Prescription Uploaded:
                                <div className="grid grid-cols-12 gap-2  justify-items-center justify-self-center">
                                    {userOrder?.prescriptions?.map(
                                        (meds, index) => (
                                            <img
                                                key={index}
                                                className="bg-[#f5f5f5] w-[90px] h-[80px] rounded-sm col-span-6 border p-2 "
                                                src={`http://localhost:3003/images/${meds}`}
                                                alt="userImage"
                                            />
                                        )
                                    )}
                                </div>
                            </span>
                        </div>
                    </div>

                    {userOrder?.status === 'delivered' ? (
                        <>
                            <div className=" flex flex-col justify-between font-default-font-family bg-[#f5f5f5] sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                                <div>
                                    <h1 className="lg:text-xl sm:text-[1.2rem] text-[1.1rem] font-default-font-family text-semibold">
                                        Bill Summary
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-[0.05rem] mt-3">
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Cart Value:
                                        </span>
                                        <span>{sampleObj.cartValue}</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Delivery charges:
                                        </span>
                                        <span>₹50.0</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Handling Charges:
                                        </span>
                                        <span>₹50.0</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Discount:
                                        </span>
                                        <span>{sampleObj.discount}</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83] text-[1.1rem] font-medium">
                                            Total:
                                        </span>
                                        <span className="text-[1.1rem] font-medium">
                                            {sampleObj.total}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    );
};

export default UserOrderPreview;
