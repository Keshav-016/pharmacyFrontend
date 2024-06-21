import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import CartImage from '../assets/images/CartImage.png';
import { notify } from '../App';
import {
    deleteFromLocalStorage,
    updateItemQty
} from '../features/userCartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartCards = ({ item }) => {
    const baseUrl = `http://localhost:3003`;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [cardDetails, setCardDetails] = useState({});
    const fetchCartItem = async () => {
        try {
            const rawData = await axios({
                method: 'get',
                url: `${baseUrl}/medicines/get-medicine?medicineId=${item.medicineId}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCardDetails(rawData?.data?.data);
        } catch (e) {
            notify(e);
        }
    };

    useEffect(() => {
        fetchCartItem();
    }, []);

    const handleDeleteCartItem = () => {
        dispatch(deleteFromLocalStorage({ cardDetails, user }));
    };

    const handleQuantityChange = async (value) => {
        const productObj = {
            id: item.medicineId,
            qty: value
        };
        dispatch(updateItemQty({ productObj, user }));
    };

    return (
        <div className=" bg-cart-card-bg my-3 rounded-md flex flex-col md:flex-row lg:justify-between justify-center p-4 gap-3 ">
            <div className="bg-white rounded-md w-[70px] h-[70px]">
                <img src={CartImage} alt="" />
            </div>
            <div className="md:w-[70%] w-[90%] flex flex-col ">
                <h1 className=" font-default-font-family">
                    {cardDetails?.name}
                </h1>
                <h2 className="text-[0.8rem] text-text-grey">
                    <span>By</span>{' '}
                    <span className=" underline">
                        {cardDetails?.manufacturerName?.toUpperCase()}
                    </span>
                </h2>
                <h2 className="text-[0.9rem] text-text-grey md:my-2">
                    {cardDetails?.packSizeLabel}
                </h2>
                <div className="flex flex-col lg:flex-row justify-start gap-10 items-start">
                    <h2 className=" font-default-font-family font-medium">
                        ₹{cardDetails?.price}
                        <sup>*</sup>
                    </h2>
                    <h2 className="text-[0.8rem]">Tomorrow, before 10:00 pm</h2>
                </div>
            </div>
            <div className="flex md:flex-col flex-row justify-between items-end">
                <button
                    onClick={() => {
                        handleDeleteCartItem();
                    }}
                    className=" md:text-[1.2rem] text-[1rem]"
                >
                    <FaRegTrashAlt />
                </button>
                <div className="bg-white px-2 py-1 rounded-md ">
                    <select
                    className=' outline-none'
                        defaultValue={item?.qty}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CartCards;
