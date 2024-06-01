import React from 'react';
import { useSelector } from 'react-redux';

const orders = ({ setOrder, order }) => {
    const orders = useSelector((state) => state.quotations.data);
    return (
        <>
            <div className="rounded-sm my-2">
                <div className="flex justify-center overflow-x-scroll flex-col flex-wrap max-h-[250px] md:max-h-none no-scrollbar">
                    {orders?.map((item) => {
                        return (
                            <div key={item?._id}>
                                <div
                                    onClick={() => {
                                        setOrder(item);
                                    }}
                                    className={`min-w-[200px] col-span-12 md:col-span-6 lg:col-span-12 grid grid-cols-12 shadow-lg cursor-pointer  rounded-xl m-2 mb-2 p-3 ${order === item ? 'bg-white border border-primary' : ' bg-white border'}`}
                                >
                                    <div className="order-2 lg:order-1 col-span-12 md:col-span-8">
                                        <h6 className="  text-text-grey text-sm mb-1">
                                            Order ID
                                        </h6>
                                        <h6 className="text-sm font-medium">
                                            {item._id}
                                        </h6>
                                    </div>
                                    <h5 className="order-1 lg:order-2 ms-auto lg:m-auto text-[0.7rem] py-1 px-2 col-span-12 lg:col-span-4 text-red border border-[#F11F52] rounded-md">
                                        NEW ORDER
                                    </h5>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default orders;
