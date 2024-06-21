import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { MdArrowRight } from 'react-icons/md';
const PaymentGateway = ({ order, onClose }) => {
    const [orderId, setOrderId] = useState();
    const data = {
        amount: Math.ceil(order?.price),
        name: 'Medigen',
        profile_name: 'Medigen',
        email: 'm@gmail.com',
        product: 'Medicine',
        number: '1234567822',
        address: 'Purbi appartment,kolkata',
        callback_url: `http://localhost:3003/payment/payment-callback?id=${order?._id}&total=${order?.price}`,
        cancel: `http://localhost:3003/payment/cancel?id=${order?._id}&total=${order?.price}`
    };
    const getOrderId = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:3003/payment/orders`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });
            setOrderId(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getOrderId();
    }, []);
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
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
    const cartvalue = order
        ? order.medicines
              .filter((item) => item?.isAvailable === true)
              .reduce(
                  (total, item) =>
                      (total +=
                          Number(item?.medicineId?.price) * item?.quantity),
                  0
              )
        : 0;
    const discount = Math.round(cartvalue + 100 - order?.price);
    const discountPercent = Math.round((discount / (cartvalue + 100)) * 100);
    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className=" z-10 fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex "
            >
                <div className=" bg-white rounded-2xl m-auto px-5 py-7 flex-col gap-5 items-center w-[90%] sm:w-[70%] md:w-auto ">
                    <div className="flex justify-between sm:gap-[200px]">
                        <h1 className="lg:text-3xl md:text-[1.5rem] text-[1.4rem] ms-2 lg:ms-5  font-default-font-family text-semibold">
                            Order Details
                        </h1>
                        <button
                            className="border border-gray-300 rounded-md px-1 "
                            onClick={onClose}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="w-[100%] bg-white rounded-md lg:p-5 p-2 ] ">
                        <div className="flex flex-col gap-0  ">
                            <div className=" flex flex-col sm:flex-row justify-between font-default-font-family  bg-grey-bg my-5 sm:p-5 p-4 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                                <div className="flex flex-col ">
                                    <span className=" text-text-grey">
                                        OrderID
                                    </span>
                                    <span>{order?.orderId}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className=" text-text-grey">
                                        Placed On
                                    </span>
                                    <span>
                                        {dateView(new Date(order.createdAt))}
                                    </span>
                                </div>
                            </div>

                            <div className="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start gap-3 sm:gap-0 font-default-font-family sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                                <div className="flex flex-col ">
                                    <span className=" text-text-grey">
                                        Delivery On
                                    </span>
                                    <span>
                                        {dateView(
                                            new Date(order?.deliveryDate)
                                        )}
                                    </span>
                                </div>

                                <div className="flex flex-col ">
                                    <span className=" text-text-grey ">
                                        Seller Name
                                    </span>
                                    <span>
                                        {order?.pharmacistId.pharmacyId?.name}
                                    </span>
                                </div>

                                <div
                                    className={`bg-orange-600 text-white px-2 py-1 rounded-md`}
                                >
                                    {order?.status}
                                </div>
                            </div>

                            <div>
                                <ul className="sm:p-5 p-2 text-[0.9rem] h-[80px] overflow-y-scroll ">
                                    {order?.medicines
                                        .filter(
                                            (item) => item?.isAvailable === true
                                        )
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    className="grid grid-cols-12 mt-3 sm:mt-0"
                                                    key={index}
                                                >
                                                    <p className=" flex gap-1 max-w-[300px] text-nowrap text-[0.9rem] col-span-12 sm:col-span-6">
                                                        <span className="mt-1">
                                                            <MdArrowRight />
                                                        </span>
                                                        <span className="truncate">
                                                            {
                                                                item?.medicineId
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </p>
                                                    <span className="text-text-grey text-[0.8rem] ms-4 mt-1 sm:mt-0 sm:ms-0 col-span-6 sm:col-span-4">
                                                        QTY: {item?.quantity}
                                                    </span>
                                                    <span className="text-text-grey text-[0.8rem] mt-1 sm:mt-0 col-span-6 sm:col-span-2">
                                                        PRICE:{' '}
                                                        {
                                                            item?.medicineId
                                                                ?.price
                                                        }
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </ul>
                            </div>

                            {order.status ? (
                                <div className="mt-10">
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
                                                    ₹ {order?.price}
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
                    <form
                        method="POST"
                        action="https://api.razorpay.com/v1/checkout/embedded"
                    >
                        <input
                            type="hidden"
                            name="key_id"
                            value="rzp_test_ZfaQ8QQPckjfle"
                        />
                        <input
                            type="hidden"
                            name="amount"
                            value={data.amount * 100}
                        />
                        <input type="hidden" name="order_id" value={orderId} />
                        <input type="hidden" name="name" value={data.name} />
                        <input
                            type="hidden"
                            name="description"
                            value="Medicines for your good health"
                        />
                        <input
                            type="hidden"
                            name="image"
                            value="https://iimtu.edu.in/blog/wp-content/uploads/2023/05/Career-1.jpg"
                        />
                        <input
                            type="hidden"
                            name="prefill[name]"
                            value={data.profile_name}
                        />
                        <input
                            type="hidden"
                            name="prefill[contact]"
                            value={data.number}
                        />
                        <input
                            type="hidden"
                            name="prefill[email]"
                            value={data.email}
                        />
                        <input
                            type="hidden"
                            name="notes[shipping address]"
                            value={data.address}
                        />
                        <input
                            type="hidden"
                            name="callback_url"
                            value={data.callback_url}
                        />
                        <input
                            type="hidden"
                            name="cancel_url"
                            value={data.cancel}
                        />
                        <div className="flex justify-end mx-2 lg:mx-5">
                            <Button>Pay Now</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PaymentGateway;
