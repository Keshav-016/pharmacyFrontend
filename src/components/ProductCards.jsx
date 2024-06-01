import Bottle from '../assets/images/Bottle.png';
import { useDispatch } from 'react-redux';
import { addToCart, decreaseQuantity } from '../features/userCartSlice';

import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from '@material-tailwind/react';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router-dom';

const ProductCards = ({ itemProduct }) => {
    const dispatch = useDispatch();

    const handleNewCartItem = () => {
        dispatch(addToCart(itemProduct));
    };

    const handleIncreaseItem = () => {
        dispatch(addToCart(itemProduct));
    };

    const handleDecreaseItem = () => {
        dispatch(decreaseQuantity(itemProduct));
    };

    return (
        <>
            <Card className="mt-10 w-72  shadow-md ">
                <Link to={`/item?itemId=${itemProduct._id}`}>
                    <CardHeader
                        color="blue-gray"
                        className="relative h-56 mx-0 shadow-none rounded-none bg-[#2AB58C] rounded-t-lg "
                    >
                        <div className="flex justify-center items-center py-5  w-100 h-100 ">
                            <img
                                src={Bottle}
                                alt="card-image"
                                className=" h-100 w-100"
                            />
                        </div>
                    </CardHeader>
                    <CardBody className="p-4 h-[80px]">
                        <Typography className="mb-2 font-default-font-family flex flex-col justify-center items-start">
                            <p className=" text-[1rem] font-medium">
                                {itemProduct.name}
                            </p>
                            <p className="text-[0.8rem] text-[#697275]">
                                By
                                <span className=" underline">
                                    {itemProduct.manufacturer_name}
                                </span>
                            </p>
                        </Typography>
                    </CardBody>
                </Link>
                <hr />
                <div>
                    <AddToCartBtn
                        id={itemProduct._id}
                        handleNewCartItem={handleNewCartItem}
                        handleDecreaseItem={handleDecreaseItem}
                        handleIncreaseItem={handleIncreaseItem}
                    />
                </div>
            </Card>
        </>
    );
};

export default ProductCards;
