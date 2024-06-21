import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingelCartItem } from '../../../features/userCartSlice';
import { updateItemQty } from '../../../features/userCartSlice';
import { useState } from 'react';
import notFound from '../../../assets/images/not_found.jpg';
import { baseUrl } from '../../../utils/constants';

const ItemInCart = ({ name, manufacturerName, price, size, id, item, qty }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(item?.medicineId?.medicineId?.images[0]);
    const user = useSelector((state) => state.user);

    const handleDeleteCartItem = (item) => {
        dispatch(deleteSingelCartItem({ item, user }));
    };

    const handleQuantityChange = async (value) => {
        const productObj = {
            id: id,
            qty: value
        };
        dispatch(updateItemQty({ productObj, user }));
    };

   

    return (
        <div className=" bg-cart-card-bg my-3 rounded-md flex flex-col md:flex-row lg:justify-between justify-center p-4 gap-3 ">
            <div className="bg-white rounded-md w-[70px] h-[70px]">
                <img
                    src={`${baseUrl}/images/${image}`}
                    onError={(e) => {
                        e.target.src = notFound;
                    }}
                    className="w-full h-full aspect-square object-contain hover:cursor-pointer hover:scale-[110%] p-1 sm:px-2"
                />
            </div>
            <div className="md:w-[70%] w-[90%] flex flex-col ">
                <h1 className=" font-default-font-family">{name}</h1>
                <h2 className="text-[0.8rem] text-text-grey">
                    <span>By</span>{' '}
                    <span className=" underline">
                        {manufacturerName?.toUpperCase()}
                    </span>
                </h2>
                <h2 className="text-[0.9rem] text-text-grey md:my-2">{size}</h2>
                <div className="flex flex-col lg:flex-row justify-start lg:gap-10 gap-2 items-start">
                    <h2 className=" font-default-font-family font-medium">
                        ₹{price}
                        <sup>*</sup>
                    </h2>
                    <h2 className="text-[0.8rem]">Tomorrow, before 10:00 pm</h2>
                </div>
            </div>
            <div className="flex md:flex-col flex-row justify-between items-center">
                <button
                    onClick={() => {
                        handleDeleteCartItem({ item });
                    }}
                    className=" md:text-[1.2rem] text-[1rem]"
                >
                    <FaRegTrashAlt />
                </button>
                <div className="bg-white px-2 py-1 rounded-md ">
                    <select
                        className=" outline-none"
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
