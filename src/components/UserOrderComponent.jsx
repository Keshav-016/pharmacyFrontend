import { useEffect } from 'react';
import OrderCards from './OrderCards';
import React from 'react';
import { getAllUserOrders } from '../features/userFinalOrderSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserOrderComponent = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector((state) => state.userOrders.data);

    useEffect(() => {
        dispatch(getAllUserOrders());
    }, []);

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4">
                <h1 className="lg:text-3xl md:text-[1.7rem] text-[1.4rem]  font-default-font-family text-semibold">
                    My Orders
                </h1>
                <div className=" grid xl:grid-cols-2 my-5  gap-5 ">
                    {userOrders?.map((item) => (
                        <OrderCards key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserOrderComponent;
