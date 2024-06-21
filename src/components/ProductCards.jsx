import DemoImage from '../assets/images/demoMedicine.png';
import notFound from '../assets/images/not_found.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity } from '../features/userCartSlice';
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from '@material-tailwind/react';
import AddToCartBtn from './AddToCartBtn';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils/constants';
import randomcolor from 'randomcolor';
const ProductCards = ({ itemProduct }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const color = randomcolor({
        hue: '#00d2ff'
    });
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
            <Card className=" w-72  shadow-md  ">
                <Link to={`/item?itemId=${itemProduct._id}`}>
                    <CardHeader
                        color="blue-gray"
                        className="relative h-56 mx-0 shadow-none rounded-none rounded-t-lg "
                    >
                        <div
                            style={{ backgroundColor: color }}
                            className="flex justify-center items-center p-5  "
                        >
                            {itemProduct?.images[0] ? (
                                <img
                                    src={`${baseUrl}/images/${itemProduct?.images[0]}`}
                                    onError={(e) => {
                                        e.target.src = notFound;
                                    }}
                                    className=" h-100 w-100"
                                />
                            ) : (
                                <img
                                    src={DemoImage}
                                    onError={(e) => {
                                        e.target.src = notFound;
                                    }}
                                    className=" cover"
                                />
                            )}
                        </div>
                    </CardHeader>
                    <CardBody className="p-4 h-[80px]">
                        <Typography className="mb-2 font-default-font-family flex flex-col justify-center items-start">
                            <p className=" text-[1rem] font-medium  truncate w-[250px] ">
                                {itemProduct.name}
                            </p>
                            <p className="text-[0.8rem] text-[#697275] flex gap-1">
                                <span>By</span>
                                <span className=" underline">
                                    {itemProduct.manufacturerName}
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
