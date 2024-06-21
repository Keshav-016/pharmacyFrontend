import { useEffect } from 'react';
import OrderCards from './OrderCards';
import React from 'react';
import { getAllUserOrders } from '../features/userFinalOrderSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserOrderComponent = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector((state) => state.userOrders.data);
    console.log(userOrders)

    useEffect(() => {
        dispatch(getAllUserOrders());
    }, []);

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-8 sm:px-20 xs:px-10 p-4">
                <h1 className="lg:text-3xl md:text-[1.7rem] text-[1.4rem]  font-default-font-family text-semibold">
                    My Orders
                </h1>
                <div className=" grid xl:grid-cols-2 my-5 gap-5 max-h-[55vh] overflow-y-scroll no-scrollbar">
                    {userOrders?.length < 1 ? (
                        <div className=" col-span-12  flex justify-center items-center font-default-font-family text-[#757575] text-[2rem] h-[43vh] w-full">
                            No orders yet!🥱
                        </div>
                    ) : (
                        userOrders?.map((item) => (
                            <OrderCards key={item?._id} item={item} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default UserOrderComponent;
