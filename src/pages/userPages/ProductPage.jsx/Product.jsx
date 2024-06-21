import { useEffect, useState } from 'react';
import bottle from '../../../assets/images/Bottle.png';
import AddToCartBtn from '../../../components/AddToCartBtn';
import Footer from '../../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicineItem } from '../../../features/currentItemSlice';
import { addToCart, decreaseQuantity } from '../../../features/userCartSlice';
import DemoImage from '../../../assets/images/demoMedicine.png';
import notFound from '../../../assets/images/not_found.jpg';
import { baseUrl } from '../../../utils/constants';

const Product = () => {
    const dispatch = useDispatch();
    const itemProduct = useSelector((state) => state.currentItem);
    const user = useSelector((state) => state.user);
    const [img, setImg] = useState();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const itemId = params.get('itemId');
        dispatch(getMedicineItem(itemId));
    }, []);

    useEffect(() => {
        itemProduct?.images
            ? setImg(`${baseUrl}/images/${itemProduct.images[0]}`)
            : setImg(DemoImage);
    }, [itemProduct]);

    const handleNewCartItem = () => {
        dispatch(addToCart({ itemProduct, user }));
    };

    const handleIncreaseItem = () => {
        dispatch(addToCart({ itemProduct, user }));
    };

    const handleDecreaseItem = () => {
        dispatch(decreaseQuantity({ itemProduct, user }));
    };
    return (
        <>
            <div className="flex flex-col justify-between lg:min-h-[90vh] bg-[#EBF6F9] max-w-[1400]">
                <div className="  flex flex-col justify-center items-center ">
                    <div className="lg:py-12 py-5  grid lg:grid-cols-2 grid-rows-2s lg:gap-10 justify-center items-center content-center px-5 rounded-xl  bg-white w-[90%] md:w-[70%] lg:min-w-[840px] mt-6">
                        <div className="mx-4  rounded-2xl flex flex-col gap-5 w-[90%] mb-5">
                            <div className="bg-[#F6F6F8] rounded-md flex justify-center p-5">
                                <img
                                    src={img}
                                    className=" w-full aspect-square object-contain hover:scale-[105%]"
                                    onError={(e) => {
                                        e.target.src = notFound;
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-5 px-3 sm:px-10">
                                {itemProduct?.images?.map((image) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setImg(
                                                    `${baseUrl}/images/${image}`
                                                );
                                            }}
                                            className="bg-product-bg md:w-[100%] md:h-[100px] rounded-md "
                                        >
                                            <img
                                                src={`${baseUrl}/images/${image}`}
                                                onError={(e) => {
                                                    e.target.src = notFound;
                                                }}
                                                className="w-full h-full aspect-square object-contain hover:cursor-pointer hover:scale-[110%] p-1 sm:px-2"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 max-w-[300px] mx-4">
                            <h1 className=" font-default-font-family lg:text-[2rem] text-[1.4rem] leading-12">
                                {itemProduct?.name}
                            </h1>
                            <p className=" font-default-font-family text-[#697275] lg:text-[0.9rem] text-[0.6rem] mb-5">
                                <span className=" underline">
                                    {itemProduct?.manufacturerName}
                                </span>
                            </p>
                            <div className="lg:text-[1.2rem] text-[1rem] mb-5">
                                <span className="font-semi-bold">MRP</span> ₹
                                {itemProduct?.price}
                                <span className="px-5 text-[0.8rem]">
                                    (Inclusive of all taxes)
                                </span>{' '}
                            </div>
                            <div className=" rounded-sm bg-[#f5f5f5] mt-1 mb-6">
                                {' '}
                                <AddToCartBtn
                                    id={itemProduct?._id}
                                    handleNewCartItem={handleNewCartItem}
                                    handleDecreaseItem={handleDecreaseItem}
                                    handleIncreaseItem={handleIncreaseItem}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-10 mb-3">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Product;
