import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersDetails } from '../../../../features/adminAllOrderSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../components/Loader';
import NothingToShow from '../../../../components/NothingToShow';
import ErrorPage from '../../../../components/ErrorPage';

const CustomerData = (page) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllOrdersDetails(page));
    }, [page]);
    const customerData = useSelector((state) => state?.adminAllOrder?.data);
    const customerDataIsError = useSelector(
        (state) => state?.adminAllOrder?.isError
    );
    const customerDataIsLoading = useSelector(
        (state) => state?.adminAllOrder?.isLoading
    );

    return customerDataIsLoading ? (
        <Loader />
    ) : customerDataIsError ? (
        <ErrorPage />
    ) : !customerData?.length ? (
        <NothingToShow />
    ) : (
        <>
            <div className="px-3 overflow-x-scroll no-scrollbar">
                <div className=" min-w-[760px] max-w-[1200px] mx-auto rounded-lg pb-1 bg-white">
                    <div className="grid grid-cols-12  ps-5 py-5 text-[0.9rem] bg-white rounded-t-lg text-slate-400">
                        <div className="col-span-3">Order ID</div>
                        <div className="col-span-2">Customer Name</div>
                        <div className="col-span-2">Order Date/Time</div>
                        <div className="col-span-3">Customer Address</div>
                        <div className="col-span-2">Status</div>
                    </div>
                    <div className="cursor-pointer max-h-[59vh] overflow-scroll no-scrollbar">
                        {customerData?.map((item) => {
                            return (
                                <div
                                    className="grid grid-cols-12 bg-white text-[0.94rem] ps-5 border-t"
                                    key={item?._id}
                                    onClick={() =>
                                        navigate(
                                            `/admin/admin-preview?id=${item?._id}`
                                        )
                                    }
                                >
                                    <div className="col-span-3 py-2 me-3 truncate">
                                        {item?._id}
                                    </div>
                                    {item?.userId?.name === undefined ? (
                                        <div className="col-span-2 py-2 ps-12">
                                            ---
                                        </div>
                                    ) : (
                                        <div className="col-span-2 py-2 truncate">
                                            {item?.userId?.name}
                                        </div>
                                    )}
                                    <div className="col-span-2 py-2">
                                        {item?.createdAt.slice(0, 10)}
                                    </div>

                                    <div className="col-span-3  py-2 me-10">
                                        {item?.address?.area === ''
                                            ? '---'
                                            : item?.address?.building +
                                              ', ' +
                                              item?.address?.area +
                                              ', ' +
                                              item?.address?.city +
                                              ', ' +
                                              item?.address?.state +
                                              ', ' +
                                              item?.address?.postcode}
                                    </div>

                                    <div className="col-span-2 my-auto text-[0.9rem]">
                                        <button
                                            className={`py-1 px-2 rounded text-white ${item.status === 'confirmed' ? 'bg-yellow-600' : item.status === 'delivered' ? 'bg-green-600' : ' bg-red'}`}
                                        >
                                            {item?.status === 'pending'
                                                ? 'NEW ORDER'
                                                : item?.status.toUpperCase()}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerData;
