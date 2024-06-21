import React from 'react';
import { MdArrowRight } from 'react-icons/md';

const PharmacistOrderPreview = ({ order }) => {
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
    const cartvalue = order.quotationId
        ? order.quotationId.medicines
              .filter((item) => item?.isAvailable === true)
              .reduce(
                  (total, item) =>
                      (total +=
                          Number(item?.medicineId?.price) * item?.quantity),
                  0
              )
        : 0;
    const discount = Math.round(cartvalue + 100 - order?.quotationId?.price);
    const discountPercent = Math.round((discount / cartvalue) * 100);
    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 ] ">
                <h1 className="lg:text-3xl md:text-[1.5rem] text-[1.4rem] ms-2  font-default-font-family text-semibold">
                    Order Details
                </h1>
                <div className="flex flex-col gap-0  ">
                    <div className=" flex flex-col sm:flex-row justify-between font-default-font-family  bg-grey-bg my-5 sm:p-5 p-4 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                        <div className="flex flex-col ">
                            <span className=" text-text-grey">OrderID</span>
                            <span>{order?.orderId?._id}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className=" text-text-grey">Placed On</span>
                            <span>{dateView(new Date(order.createdAt))}</span>
                        </div>
                    </div>

                    <div className="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start gap-3 sm:gap-0 font-default-font-family sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                        <div className="flex flex-col ">
                            <span className=" text-text-grey">
                                Delivered On
                            </span>
                            <span>
                                {dateView(
                                    new Date(order?.quotationId?.deliveryDate)
                                )}
                            </span>
                        </div>

                        <div className="flex flex-col ">
                            <span className=" text-text-grey ">
                                Seller Name
                            </span>
                            <span>{order?.pharmacistId?.name}</span>
                        </div>

                        <div
                            className={`bg-orange-600 text-white px-2 py-1 rounded-md`}
                        >
                            {order?.status}
                        </div>
                    </div>

                    <div>
                        <ul className="sm:p-5 p-2 text-[0.9rem]">
                            {order.quotationId?.medicines
                                .filter((item) => item?.isAvailable === true)
                                .map((item, index) => {
                                    return (
                                        <div
                                            className="grid grid-cols-4 mt-3 sm:mt-0"
                                            key={index}
                                        >
                                            <p className=" flex gap-1 max-w-[300px] text-nowrap text-[0.9rem] col-span-4 sm:col-span-2 ">
                                                <span>
                                                    <MdArrowRight />
                                                </span>
                                                <span className="truncate">
                                                    {item?.medicineId?.name}
                                                </span>
                                            </p>
                                            <span className="text-text-grey text-[0.8rem] ms-4 mt-1 sm:mt-0 sm:mx-auto mx-auto col-span-2 sm:col-span-1">
                                                QTY: {item?.quantity}
                                            </span>
                                            <span className="text-text-grey text-[0.8rem] mt-1 sm:mt-0 col-span-2 sm:col-span-1">
                                                PRICE: {item?.medicineId?.price}
                                            </span>
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>

                    <div className="grid grid-cols-12 items-start justify-center font-default-font-family sm:p-5 p-2 rounded-md text-[0.8rem] lg:text-[0.9rem] w-[100%]">
                        <div className="flex flex-col  sm:col-span-3  col-span-6 sm:w-[80%] w-[100%]">
                            <span className=" text-text-grey">
                                Shipment Total:
                            </span>
                            <span>₹{order?.quotationId?.price}</span>
                        </div>
                        <div className="flex flex-col sm:col-span-5 col-span-6">
                            <span className=" text-text-grey">
                                Shipment Address:
                            </span>
                            <p className=" text-[0.9rem]">
                                {order?.orderId?.address?.building},{' '}
                                {order?.orderId?.address?.area},{' '}
                                {order?.orderId?.address?.landmark} -
                                {order?.orderId?.address?.pin}
                            </p>
                        </div>
                        <div className="flex flex-col sm:col-span-4 col-span-12 mt-3 sm:mt-0 ">
                            <span className=" text-text-grey">
                                Prescription Uploaded:
                            </span>
                        </div>
                    </div>

                    {order.status ? (
                        <>
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
                                            ₹{order?.quotationId?.price}
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

export default PharmacistOrderPreview;
