import React, { useState } from 'react';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import PaymentGateway from '../utils/payment/PaymentGateway';
import GenericModal from '../components/GenericModal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllPharmacistOffer } from '../features/pharmacistOffersSlice';
import { MdArrowRight } from 'react-icons/md';
const OuderOfferCards = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openQuotation, setOpenQuotation] = useState(false);
    const cartvalue = item
        ? parseFloat(
            item.medicines
                .filter((medicine) => medicine?.isAvailable === true)
                .reduce(
                    (total, medicine) =>
                    (total +=
                        Number(medicine?.medicineId?.price) *
                        medicine?.quantity),
                    0
                )
                .toFixed(2)
        )
        : 0;
    const discount = Math.round(cartvalue + 100 - item?.price);
    const discountPercent = Math.round((discount / (cartvalue + 100)) * 100);

    const handleUserFinalOrder = (e) => {
        e.stopPropagation();
        handleConfirmAlert(
            'question',
            '',
            'Are you sure you want to place your order',
            'Place Order',
            () => setIsOpen(true)
        );
    };
    const dispatch = useDispatch();
    const declineOrder = async () => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'put',
                url: `http://localhost:3003/quotation/user-decline?quotationId=${item._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getAllPharmacistOffer(window.location.search.slice(4)));
        } catch (e) {
            console.log(e);
        }
    };

    const handleDecline = (e) => {
        e.stopPropagation();
        handleConfirmAlert(
            'question',
            '',
            'Are you sure you want to decline this offer',
            'Decline',
            () => declineOrder()
        );
    };
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
        const minutes = date.getMinutes();

        return `${month} ${day}, ${year}  ${hour}:${minutes}`;
    };
    return (
        <>
            {openQuotation && (
                <GenericModal onClose={() => setOpenQuotation(false)}>
                    <div className="flex justify-between sm:gap-[200px]">
                        <h1 className="lg:text-3xl md:text-[1.5rem] text-[1.4rem] ms-2 lg:ms-5  font-default-font-family text-semibold">
                            Order Details
                        </h1>
                    </div>
                    <div className="w-[100%] bg-white rounded-md lg:p-5 p-2 ] ">
                        <div className="flex flex-col gap-0  ">
                            <div className="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start gap-3 sm:gap-0 font-default-font-family sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                                <div className="flex flex-col ">
                                    <span className=" text-text-grey">
                                        Delivery On
                                    </span>
                                    <span>
                                        {dateView(new Date(item?.deliveryDate))}
                                    </span>
                                </div>

                                <div className="flex flex-col ">
                                    <span className=" text-text-grey ">
                                        Seller Name
                                    </span>
                                    <span>
                                        {item?.pharmacistId?.pharmacyId?.name}
                                    </span>
                                </div>

                                <div
                                    className={`bg-orange-600 text-white px-2 py-1 rounded-md`}
                                >
                                    {item?.status}
                                </div>
                            </div>

                            <div>
                                <ul className="sm:p-5 p-2 text-[0.9rem] h-[80px] overflow-y-scroll ">
                                    {item?.medicines.map((item, index) => {
                                        return (
                                            <div
                                                className="grid grid-cols-12 mt-3 sm:mt-0"
                                                key={index}
                                            >
                                                <p className=" flex gap-1 max-w-[200px] text-nowrap text-[0.9rem] col-span-12 sm:col-span-6">
                                                    <span className="mt-1">
                                                        <MdArrowRight />
                                                    </span>
                                                    <span
                                                        className={`truncate ${item?.isAvailable ? ' text-green-500' : 'text-red'}`}
                                                    >
                                                        {item?.medicineId?.name}
                                                    </span>
                                                </p>
                                                <span className="text-text-grey text-[0.8rem] ms-4 mt-1 sm:mt-0 sm:ms-0 col-span-6 sm:col-span-4">
                                                    QTY: {item?.quantity}
                                                </span>
                                                <span className="text-text-grey text-[0.8rem] mt-1 sm:mt-0 col-span-6 sm:col-span-2">
                                                    PRICE:{' '}
                                                    {item?.medicineId?.price}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className='flex gap-4 mt-8 sm:ps-5 ps-2 max-w-[550px] max-h-[100px] overflow-y-scroll no-scrollbar'>
                                <span className='text-[0.9rem]'>Note:- </span>
                                <span className='text-[0.8rem]'>{item.notes === '' ? "---" : item?.notes}</span>
                            </div>

                            {item?.status ? (
                                <div className="mt-8">
                                    <div className=" flex flex-col justify-between font-default-font-family bg-grey-bg sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                                        <div>
                                            <h1 className="lg:text-xl sm:text-[1.2rem] text-[1.1rem] font-default-font-family text-semibold">
                                                Bill Summary
                                            </h1>
                                        </div>
                                        <div className="flex flex-col gap-[0.05rem] mt-3">
                                            <div className="flex flex-row justify-between">
                                                <span className=" text-text-grey">
                                                    Cart Value:
                                                </span>
                                                <span className="text-text-grey">
                                                    ₹{cartvalue}
                                                </span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className=" text-text-grey">
                                                    Delivery charges:
                                                </span>
                                                <span className="text-text-grey">
                                                    ₹50
                                                </span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className=" text-text-grey">
                                                    Handling Charges:
                                                </span>
                                                <span className="text-text-grey">
                                                    ₹50
                                                </span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className=" text-text-grey">
                                                    Discount:
                                                </span>
                                                <span className="text-text-grey">
                                                    -₹{discount}{' '}
                                                    <span className="text-[#1444EF]">
                                                        {' '}
                                                        ({discountPercent}%)
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <span className="text-[1.1rem] font-medium">
                                                    Total:
                                                </span>
                                                <span className="text-[1.1rem] font-medium">
                                                    ₹ {item?.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </GenericModal>
            )}
            <div
                className=" border rounded-md max-w-[330px] py-3 mt-4 cursor-pointer lg:mx-auto "
                onClick={() => {
                    setOpenQuotation(true);
                }}
            >
                <div className=" flex gap-3 xl:justify-center justify-start pb-2 ps-2 pe-2">
                    <span className=" inline-block h-[50px] w-[50px] bg-[#e1e1e1] rounded-[50%]"></span>
                    <div className="xxl:px-5 px-1">
                        <span className=" sm:text-[1rem] text-[0.9rem]">
                            {item?.pharmacistId?.pharmacyId?.name?.toUpperCase()}
                        </span>
                        <div className=" flex sm:flex-row flex-col justify-start sm:justify-between sm:items-center sm:gap-5">
                            <span className=" font-semibold text-medium">
                                ₹{parseFloat(item?.price).toFixed(2)}
                            </span>
                            {item?.status !== 'declined' && (
                                <span className=" text-[#1444ef] text-sm">
                                    Discount : {discountPercent}%
                                </span>
                            )}
                        </div>
                        {item?.status !== 'declined' ? (
                            <div className="flex justify-between py-3">
                                <button
                                    className="w-[48%] bg-white border border-[#1444EF] text-button p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]"
                                    onClick={handleDecline}
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleUserFinalOrder}
                                    className="w-[48%] bg-button border border-[#1444EF] text-white p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                                >
                                    Accept
                                </button>
                            </div>
                        ) : (
                            <div className="text-red text-[0.8rem] items-center gap-1 flex font-default-font-family">
                                <IoMdInformationCircleOutline /> This offer is
                                not valid!
                            </div>
                        )}
                    </div>
                </div>

                <div className="xl:text-center text-start sm:px-3 px-2 text-[0.8rem] border-t-2 pt-3 ">
                    <span className=" text-[#737A83] ">Delivery by </span>{' '}
                    {item?.deliveryDate.slice(0, 10)} , before{' '}
                    {item?.deliverySlot === 1 ? (
                        <span>2:00pm</span>
                    ) : (
                        <span>7:00pm</span>
                    )}
                </div>
                {isOpen && (
                    <PaymentGateway
                        order={item}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </div>
        </>
    );
};

export default OuderOfferCards;
