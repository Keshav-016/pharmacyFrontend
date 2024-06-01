import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { deliveryAddress } from '../features/userAddressSlice';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { useState } from 'react';
import { addNewOrder } from '../features/userFinalOrderSlice';
import { Link } from 'react-router-dom';

const UserAddress = ({ files, total, setFiles }) => {
    const allUserAddress = useSelector((state) => state.userAddress.data);
    const cartItems = useSelector((state) => state.userCart);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [path, setPath] = useState(window.location.pathname);

    const handleModal = () => {
        handleConfirmAlert(
            '',
            'Please Confirm Your Order',
            '',
            'Yes, Confirm',
            handleFileUpload
        );
    };
    const userDeliveryAddress = useSelector(
        (state) => state.userAddress.deliveryAddress
    );
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleDeliveryAddress = (item) => {
        dispatch(deliveryAddress(item._id));
    };

    const handleCartModal = () => {
        handleConfirmAlert(
            '',
            'Please Confirm Your Order',
            '',
            'Yes, Confirm',
            handleFileUpload
        );
    };

    const DrawerList = (
        <Box
            sx={{ width: 280 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <Box
                sx={{ width: 280 }}
                role="presentation"
                onClick={toggleDrawer(false)}
            >
                {allUserAddress?.length > 0 ? (
                    <>
                        <List>
                            <div className="flex font-default-font-family justify-start ms-4 align-center mt-5">
                                Saved Addresses
                            </div>
                            {allUserAddress?.map((item) => (
                                <div
                                    key={item._id}
                                    className="text-[#000000] text-[0.7rem] m-3 p-4 border-[0.08rem] rounded-md"
                                    onClick={() => {
                                        handleDeliveryAddress(item);
                                    }}
                                >
                                    <h1 className=" font-default-font-family text-[0.9rem] text-black font-semibold ">
                                        {item.type} Address
                                    </h1>
                                    <h1 className="text-[#737A83]">
                                        {item.receiverName}
                                    </h1>
                                    <div className="text-[#737A83]">
                                        {item.address.building},
                                        {item.address.area},{item.address.city},
                                        {item.address.state},
                                        {item.address.country},<br />
                                        Pin-{item.address.postcode}{' '}
                                    </div>
                                    <h1 className="text-[#737A83]">
                                        +91 {item.phone}
                                    </h1>
                                </div>
                            ))}
                        </List>
                        <Link to="/user-address">
                            <div className=" flex items-center justify-center text-[#1444ef] text-[0.9rem] underline cursor-pointer">
                                +Add New Address
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <div
                            onClick={() => {
                                navigate('/user-address');
                            }}
                            className=" flex items-center justify-center text-[#1444ef] text-[0.9rem] underline cursor-pointer"
                        >
                            +Add New Address
                        </div>
                    </>
                )}
            </Box>
        </Box>
    );

    const handleFileUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('prescription', files[i]);
        }
        formData.append('addressId', userDeliveryAddress._id);
        dispatch(addNewOrder(formData));
        setFiles([]);
    };

    return (
        <>
            <>
                {path !== '/prescription' ? (
                    <>
                        <h1 className="text-[1.1rem] font-normal font-default-font-family">
                            {' '}
                            Total MRP : ₹
                            <span className="font-semibold">{total}</span>
                        </h1>
                        <div className="sm:w-[35%] w-[100%] lg:w-[100%] flex justify-center items-center">
                            <button
                                onClick={handleCartModal}
                                className="w-[90%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                            >
                                Create Order
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="sm:w-[35%] w-[100%] lg:w-[100%] flex flex-col justify-center items-center">
                        <button
                            onClick={handleModal}
                            className="w-[90%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                        >
                            Create Order
                        </button>
                    </div>
                )}

                <div className=" flex flex-col gap-3  rounded-md">
                    <div className="text-[#000000] border-[0.08rem] rounded-md p-2 text-[0.8rem]">
                        <h1 className=" font-default-font-family text-[1rem] text-black font-medium ">
                            {userDeliveryAddress?.type} Address
                        </h1>
                        <h1 className="text-[#737A83]">
                            {userDeliveryAddress?.receiverName}
                        </h1>
                        <div className="text-[#737A83]">
                            {userDeliveryAddress?.address?.building},
                            {userDeliveryAddress?.address?.area},
                            {userDeliveryAddress?.address?.city},
                            {userDeliveryAddress?.address?.state},
                            {userDeliveryAddress?.address?.country},<br />
                            Pin: {userDeliveryAddress?.address?.postcode}{' '}
                        </div>
                        <h1 className="text-[#737A83]">
                            Phone: +91 {userDeliveryAddress?.phone}
                        </h1>
                    </div>

                    <Button
                        sx={{
                            color: '#1444ef',
                            textTransform: 'none',
                            textDecoration: 'underline'
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        Change Address
                    </Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
            </>
        </>
    );
};

export default UserAddress;
