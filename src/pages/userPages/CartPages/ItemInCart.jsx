import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import CartImage from '../../../assets/images/CartImage.png';
import { useDispatch } from 'react-redux';
import { deleteSingelCartItem } from '../../../features/userCartSlice';
import { updateItemQty } from '../../../features/userCartSlice';
import axios from 'axios';

const ItemInCart = ({ name, mfName, price, size, id, item, qty }) => {
    const dispatch = useDispatch();
    const handleDeleteCartItem = (item) => {
        dispatch(deleteSingelCartItem(item));
    };

    const handleQuantityChange = async (value) => {
        const productObj = {
            id: id,
            qty: value
        };
        dispatch(updateItemQty(productObj));
    };

    return (
        <div className=" bg-cart-card-bg my-3 rounded-md flex flex-col md:flex-row lg:justify-between justify-center p-4 gap-3 ">
            <div className="bg-white rounded-md w-[70px] h-[70px]">
                <img src={CartImage} alt="" />
            </div>
            <div className="md:w-[70%] w-[90%] flex flex-col ">
                <h1 className=" font-default-font-family">{name}</h1>
                <h2 className="text-[0.8rem] text-text-grey">{mfName}</h2>
                <h2 className="text-[0.8rem] text-text-grey md:my-2">{size}</h2>
                <div className="flex flex-col lg:flex-row justify-between pe-5">
                    <h2 className=" font-default-font-family font-medium">
                        ₹{price}
                        <sup>*</sup>
                    </h2>
                    <h2 className="text-[0.8rem]">Tomorrow, before 10:00 pm</h2>
                </div>
            </div>
            <div className="flex md:flex-col flex-row justify-between items-center mt-5">
                <div>
                    <button
                        onClick={() => {
                            handleDeleteCartItem({ item });
                        }}
                        className=" md:text-[1.3rem] text-[1.2rem]"
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>
                <div className="bg-white px-2 py-1 rounded-md ">
                    <select
                        defaultValue={qty}
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

export default ItemInCart;
