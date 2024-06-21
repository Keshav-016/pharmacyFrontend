import React, { useState } from 'react';
import Button from './Button';
import ButtonOutlined from './ButtonOutlined';
import { MdArrowRight } from 'react-icons/md';
import PharmacistOrderModal from './PharmacistOrderModal';
import axios from 'axios';
import notify from '../App';
import { useDispatch } from 'react-redux';
import { fetchFinalOrders } from '../features/orderSlice';
import ImageModal from './ImageModal';
import handleConfirmAlert from '../utils/ConfirmTemplate';

const PharmacistOrderCards = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
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
    const dateView = (date) => {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const convertedHour = hour > 12 ? hour - 12 : hour;
        const minutes = date.getMinutes();

        return `${month} ${day}, ${year}  \u00A0\u00A0\u00A0\u00A0\u00A0 ${convertedHour}:${minutes} ${hour < 12 ? 'AM' : hour < 24 ? 'PM' : 'AM'}`;
    };
    const dispatch = useDispatch();

    const updateStatus = () => {
        handleConfirmAlert('question','', 'Are your sure the order is delivered?' , 'Yes, Delivered' , () => {updateOrderStatus()});
    }

    const updateOrderStatus = async () => {
        if (order.status === 'delivered') return;
        try {
            const token =
                sessionStorage.getItem('token') ||
                localStorage.getItem('token');
            await axios({
                method: 'put',
                url: `http://localhost:3003/final-order/update-delivery-status?id=${order?.orderId?._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(fetchFinalOrders());
        } catch (errror) {
            notify(errror.response.data.message);
        }
    };

    const declineOrder = async () => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            await axios({
                method: 'DELETE',
                url: `http://localhost:3003/final-order/decline-order?orderId=${order?.orderId?._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(fetchFinalOrders());
            notify(`Successfully , declied order : ${order?.orderId?._id}`);
        } catch (error) {
            notify(error?.response?.data?.message);
        }
    };
    const handleDecline = async () => {
        handleConfirmAlert(
            'question',
            '',
            'Are you sure you want to decline order',
            'Yes',
            () => declineOrder()
        );
    };
    return (
        <>
            <div className="w-[100%] p-5  bg-white mt-3 rounded-xl">
                <div className=" grid grid-cols-6">
                    <div className=" flex flex-col col-span-3 lg:col-span-1 gap-2">
                        <span className="text-[0.9rem] text-text-grey">
                            OrderID
                        </span>
                        <span className=" text-[0.9rem] w-[100%] max-w-[120px] sm:max-w-[100%] me-5 sm:me-0 overflow-x-scroll no-scrollbar">
                            {order?.orderId?._id}
                        </span>
                    </div>
                    <div className=" flex flex-col col-span-3 lg:col-span-1 ms-auto gap-2">
                        <span className="text-[0.9rem] text-text-grey">
                            Order Date/Time
                        </span>
                        <span className=" text-[0.9rem]">
                            {dateView(new Date(order.createdAt))}
                        </span>
                    </div>
                    <div className="flex flex-col col-span-5 lg:col-span-3 gap-2 lg:ms-36 lg:ps-2 mt-3 lg:mt-0">
                        <span className="text-[0.9rem] text-text-grey">
                            Shipping Address:
                        </span>
                        <p className=" text-[0.9rem]">
                            {order?.orderId?.address?.building},{' '}
                            {order?.orderId?.address?.area},{' '}
                            {order?.orderId?.address?.landmark} -
                            {order?.orderId?.address?.pin}
                        </p>
                    </div>
                    <div className="lg:ms-auto col-span-5 lg:col-span-1 mt-7">
                        <p
                            className={`w-fit px-4 rounded-md text-white text-[0.9rem] cursor-pointer ${order.status === 'confirmed' ? 'bg-orange-500' : 'bg-green-500'}`}
                            onClick={updateStatus}
                        >
                            {order?.status?.toUpperCase()}
                        </p>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="grid grid-cols-5">
                    <div className=" col-span-5 lg:col-span-2 flex flex-col gap-2 me-10">
                        {order.quotationId?.medicines
                            .filter(
                                (item, index) =>
                                    index < 3 && item?.isAvailable === true
                            )
                            .map((item, index) => {
                                return (
                                    <div
                                        className="flex flex-col sm:flex-row justify-between"
                                        key={index}
                                    >
                                        <span className=" overflow-hidden text-ellipsis max-w-[300px] text-nowrap text-[0.9rem] flex">
                                            <MdArrowRight className="mt-1" />
                                            <span>
                                                {item?.medicineId?.name}
                                            </span>
                                        </span>
                                        <span className="text-text-grey text-[0.9rem] me-14">
                                            QTY: {item?.quantity}
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="lg:mx-auto col-span-2 lg:col-span-1 mt-3 lg:mt-0">
                        <span className="text-[0.9rem] text-text-grey">
                            Prescription
                        </span>
                        <div className="flex gap-2 mt-2">
                            {order?.orderId?.prescriptions &&
                                order.orderId.prescriptions
                                    .filter((item, index) => index < 2)
                                    .map((item, index) => {
                                        return (
                                            <div
                                                className="w-[50px] h-[50px] bg-blue-500"
                                                key={index}
                                            >
                                                <img
                                                    onClick={() => {
                                                        setModalImage(
                                                            `http://localhost:3003/images/${item}`
                                                        );
                                                        setOpenModal(true);
                                                    }}
                                                    src={`http://localhost:3003/images/${item}`}
                                                    alt={`presceription ${index}`}
                                                    className="cursor-pointer h-full w-full object-cover mx-auto bg-no-repeat "
                                                />
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                    <div className="flex gap-2 col-span-3 lg:col-span-2 mt-10 ps-10 md:ms-auto">
                        {order.status === 'confirmed' ? (
                            <div className="w-[10rem]">
                                <ButtonOutlined handleClick={handleDecline}>
                                    Decline
                                </ButtonOutlined>
                            </div>
                        ) : (
                            <div className="w-[10rem]"></div>
                        )}

                        <div className="w-[10rem]">
                            <Button handleClick={() => setIsOpen(true)}>
                                Details
                            </Button>
                        </div>
                        {isOpen && (
                            <PharmacistOrderModal
                                onClose={() => setIsOpen(false)}
                                data={order}
                            />
                        )}
                    </div>
                </div>
            </div>
            <ImageModal
                open={openModal}
                setOpen={setOpenModal}
                image={modalImage}
            />
        </>
    );
};

export default PharmacistOrderCards;
