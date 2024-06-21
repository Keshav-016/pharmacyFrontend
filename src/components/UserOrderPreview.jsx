import React, { useEffect, useState } from 'react';
import { GoTriangleRight } from 'react-icons/go';
import ImageModal from './ImageModal';
import axios from 'axios';

const UserOrderPreview = ({ subHeading, userOrder }) => {
    console.log(userOrder)
    const [deliverydata, setDeliveryData] = useState();
    let total = 0;
    userOrder?.medicines.map((meds) => {
        total = total + Number(meds?.medicineId?.price) * meds.quantity;
        total = parseFloat(total.toFixed(2));
    });
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    
    const getDeliveryData = async () => {
        try {
            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/final-order/get-order-user?orderId=${userOrder?._id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setDeliveryData(rawData);
        } catch (error) {
            console.log(error);
        }
    };
    const dateView = (date) => {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const convertedHour = hour > 12 ? hour - 12 : hour;
        const minutes = date.getMinutes();
        
        
        return `${month} ${day}, ${year}  \u00A0 ${convertedHour}:${minutes} ${hour < 12 ? 'AM' : hour < 24 ? 'PM' : 'AM'}`;
    };
    
    const cartvalue = deliverydata?.data?.data
    ? Math.round(
        deliverydata?.data?.data?.quotationId?.medicines
        .reduce(
            (total, medicine) =>
                (total +=
                    Number(medicine?.medicineId?.price) *
                    medicine?.quantity),
                    0
                )
            )
            : Math.round(
                userOrder?.medicines?.reduce(
                    (total, medicine) =>
                        (total +=
                            Number(medicine?.medicineId?.price) *
                            medicine?.quantity),
                            0
                        )
                    );
                    const discount = Math.round(
                        cartvalue + 100 - deliverydata?.data?.data?.quotationId?.price
                    );
                    const discountPercent = Math.round((discount / cartvalue) * 100);
                    useEffect(() => {
                        getDeliveryData();
                    }, [userOrder?._id]);
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

                    <div className="grid grid-cols-12 font-default-font-family rounded-md text-[0.8rem] lg:text-[0.9rem]">
                        <div className=" col-span-9 sm:col-span-10">
                            {userOrder?.status !== 'pending' ? (
                                <div className="grid grid-cols-12">
                                    <div className="flex flex-col col-span-12 sm:col-span-6">
                                        <span className="text-[#848a8f]">
                                            Delivered On
                                        </span>
                                        <span>
                                            {dateView(
                                                new Date(
                                                    deliverydata?.data?.data?.quotationId?.deliveryDate
                                                )
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col col-span-12 sm:col-span-6">
                                        <span className=" text-[#848a8f] ">
                                            Seller Name
                                        </span>
                                        <span>
                                            {
                                                deliverydata?.data?.data
                                                    ?.pharmacistId?.pharmacyId
                                                    ?.name
                                            }
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div
                            className={`lg:px-3 lg:py-1 h-fit w-fit ms-auto my-auto p-1 text-white rounded-md text-[0.9rem] col-span-3 sm:col-span-2 ${userOrder?.status === 'pending' ? 'bg-[#E47917]' : userOrder?.status === 'confirmed' ? 'bg-[#C6791F]' : 'bg-[#1DAD23]'}`}
                        >
                            {userOrder?.status}
                        </div>
                    </div>

                    <div>
                        <ul className=" pb-5 text-[0.9rem]">
                            {userOrder?.medicines?.map((item) => (
                                <div
                                    key={item?.medicineId?._id}
                                    className=" font-default-font-family mt-3  text-gray-500 list-disc text-[0.7rem] sm:text-[0.9rem]"
                                >
                                    <li className="grid  grid-cols-12">
                                        <span className="flex sm:col-span-5 col-span-8 ">
                                            <span className="mt-1">
                                                <GoTriangleRight />
                                            </span>
                                            {item?.medicineId?.name}
                                        </span>
                                        <span className="sm:col-span-7 col-span-4 ">
                                            QTY :{item?.quantity}
                                        </span>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-12 items-start justify-center font-default-font-family sm:py-5 py-2 rounded-md text-[0.8rem] lg:text-[0.9rem] w-[100%]">
                        <div className="flex flex-col  sm:col-span-3 col-span-12 sm:w-[80%] w-[100%]">
                            <span className=" text-[#848a8f]">
                                Shipment Total:
                            </span>
                            <span>₹ {cartvalue}</span>
                        </div>
                        <div className="flex flex-col sm:col-span-5 col-span-12 py-2 md:py-0 ">
                            <span className=" text-[#848a8f]">
                                Shipment Address:
                            </span>
                            <div className="pe-2 xl:pe-10">
                                {userOrder?.address?.building},
                                {userOrder?.address?.area},
                                {userOrder?.address?.city},
                                {userOrder?.address?.state},
                                {userOrder?.address?.country}, Pin -{' '}
                                {userOrder?.address?.postcode}
                            </div>
                        </div>

                        <div
                            className={`${userOrder?.prescriptions.length > 0 ? 'flex flex-col sm:col-span-4 col-span-12 mt-1 sm:mt-0 text-[#848a8f] ' : 'flex flex-col sm:col-span-4 text-gray-300 col-span-12 mt-1 sm:mt-0'}`}
                        >
                            <span>
                                Prescription Uploaded:
                                <div className="flex justify-start gap-3">
                                    {userOrder?.prescriptions?.map(
                                        (meds, index) => (
                                            <img
                                                onClick={() => {
                                                    setOpen(true);
                                                    setImage(
                                                        `http://localhost:3003/images/${meds}`
                                                    );
                                                }}
                                                key={index}
                                                className="bg-[#f5f5f5] h-[90px] rounded-sm  border object-cover "
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
                                        <span>₹ {cartvalue}</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Delivery charges:
                                        </span>
                                        <span>₹ 50.0</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Handling Charges:
                                        </span>
                                        <span>₹ 50.0</span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83]">
                                            Discount:
                                        </span>
                                        <span>
                                            ₹ {discount} ({discountPercent}%)
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className=" text-[#737A83] text-[1.1rem] font-medium">
                                            Total:
                                        </span>
                                        <span className="text-[1.1rem] font-medium">
                                            ₹{' '}
                                            {
                                                deliverydata?.data?.data
                                                    ?.quotationId?.price
                                            }
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
            {open && <ImageModal setOpen={setOpen} open={open} image={image} />}
        </>
    );
};

export default UserOrderPreview;
