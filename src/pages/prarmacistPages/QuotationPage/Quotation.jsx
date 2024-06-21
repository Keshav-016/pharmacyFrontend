import React, { useEffect, useState } from 'react';
import OrderDetailsPage from './components/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import Orders from './components/Orders.jsx';
import ImageModal from '../../../components/ImageModal.jsx';
import Loader from '../../../components/Loader.jsx';
import ErrorPage from '../../../components/ErrorPage.jsx';
import NothingToShow from '../../../components/NothingToShow.jsx';

const Quotation = () => {
    const [order, setOrder] = useState(null);
    const quotations = useSelector((state) => state.quotations);
    return quotations?.isLoading ? (
        <Loader />
    ) : quotations?.error ? (
        <ErrorPage />
    ) : !quotations?.data?.length ? (
        <div className=' min-h-[68vh]'><NothingToShow /></div>
    ) : (
        <div className=" min-h-[90vh] bg-[#EBF6F9]">
            <div className="grid grid-cols-12 gap-[20px] px-2 max-w-[1200px] m-auto">
                <div className="col-span-12 md:col-span-4">
                    <Orders setOrder={setOrder} order={order} />
                </div>
                <div className=" col-span-12 md:col-span-8">
                    <OrderDetailsPage setOrder={setOrder} order={order} />
                </div>
            </div>
        </div>
    );
};

export default Quotation;
