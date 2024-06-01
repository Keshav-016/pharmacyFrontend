import { useEffect, useState } from 'react';
import AddToCartBtn from '../../../components/AddToCartBtn';
import Footer from '../../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicineItem } from '../../../features/currentItemSlice';
import { addToCart, decreaseQuantity } from '../../../features/userCartSlice';

const Product = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const itemId = params.get('itemId');
        dispatch(getMedicineItem(itemId));
    }, []);

    const item = useSelector((state) => state.currentItem);

    const handleNewCartItem = () => {
        dispatch(addToCart(item));
    };

    const handleIncreaseItem = () => {
        dispatch(addToCart(item));
    };

    const handleDecreaseItem = () => {
        dispatch(decreaseQuantity(item));
    };

    return (
        <>
            <div className="flex flex-col justify-between lg:h-[90vh] bg-[#EBF6F9] max-w-[1400]">
                <div className="  flex flex-col justify-center items-center ">
                    <div className="  grid lg:grid-cols-2 grid-rows-2s lg:gap-10 items-center justify-center content-center px-5 rounded-xl  bg-white w-[90%] md:w-[70%] lg:min-w-[840px] mt-6">
                        <div className="mx-4 lg:my-16 my-5 rounded-2xl flex flex-col gap-10 w-[90%]">
                            <div className="bg-product-bg rounded-md flex justify-center ">
                                <div className="h-[40vh] w-[40%] flex justify-center py-7 ">
                                    <img
                                        src={`http://localhost:3003/images/${item.previewImage}`}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="bg-product-bg md:w-[100%] md:h-[100px] w-[70px] h-[70px] rounded-md">
                                    <img
                                        src={`http://localhost:3003/images/${item.previewTop}`}
                                        className="w-[100%] h-[100%] py-3  px-7 xl:px-[3rem]"
                                    />
                                </div>
                                <div className="bg-product-bg md:w-[100%] md:h-[100px] w-[70px] h-[70px] rounded-md">
                                    <img
                                        src={`http://localhost:3003/images/${item.previewBottom}`}
                                        className="w-[100%] h-[100%] py-3 px-7 xl:px-[3rem]"
                                    />
                                </div>
                                <div className="bg-product-bg md:w-[100%] md:h-[100px] w-[70px] h-[70px] rounded-md">
                                    <img
                                        src={`http://localhost:3003/images/${item.previewMiddle}`}
                                        className="w-[100%] h-[100%] py-3 px-7 xl:px-[3rem]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:my-24 gap-2">
                            <h1 className=" font-default-font-family lg:text-[2rem] text-[1.4rem] leading-8">
                                {item?.name}
                            </h1>
                            <p className=" font-default-font-family text-[#697275] lg:text-[0.9rem] text-[0.6rem]">
                                <span className=" underline">
                                    {item?.manufacturer_name}
                                </span>
                            </p>
                            <div className="lg:text-[1.2rem] text-[1rem]">
                                <span className="font-semi-bold">MRP</span> ₹
                                {item?.price}
                                <span className="px-5 text-[0.8rem]">
                                    (Inclusive of all taxes)
                                </span>{' '}
                            </div>
                            <div className=" rounded-sm bg-[#f5f5f5] my-10">
                                {' '}
                                <AddToCartBtn
                                    id={item?._id}
                                    handleNewCartItem={handleNewCartItem}
                                    handleDecreaseItem={handleDecreaseItem}
                                    handleIncreaseItem={handleIncreaseItem}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Product;
