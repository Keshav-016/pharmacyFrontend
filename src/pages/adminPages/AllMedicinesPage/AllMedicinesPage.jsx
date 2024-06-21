import React, { useRef } from 'react';
import MedicineCard from './components/MedicineCard.jsx';
import ReactPagination from '../../../components/ReactPaginate.jsx';
import { useState, useEffect } from 'react';
import MedicineModal from './components/MedicineModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchProductLists,
    searchProductList
} from '../../../features/productSlice.js';
import Footer from '../../../components/Footer.jsx';
import ErrorPage from '../../../components/ErrorPage.jsx';
import Loader from '../../../components/Loader.jsx';
import NothingToShow from '../../../components/NothingToShow.jsx';

const AllMedicinesPage = () => {
    const [showModel, setShowModal] = useState(false);
    const searchRef = useRef();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const medicineData = useSelector((state) => state?.product?.data);
    const total = useSelector((state) => state?.product?.total);
    const medicineDataIsLoading = useSelector(
        (state) => state?.product?.isLoading
    );
    const medicineDataIsError = useSelector((state) => state?.product?.isError);

    useEffect(() => {
        dispatch(fetchProductLists(page));
    }, [page]);

    const handleSearchInput = (e) => {
        if (searchRef.current.value === '') {
            dispatch(fetchProductLists(0));
        }
        dispatch(searchProductList(searchRef.current.value));
    };

    return (
        <div className=" bg-[#EBF6F9] flex flex-col min-h-[90vh]">
            <div className="overflow-x-scroll no-scrollbar">
                <div className="px-2 min-w-[760px] max-w-[1200px] mx-auto">
                    <div className="flex w-[100%] justify-between mt-6 mb-3">
                        <div className="relative ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                className="block w-full p-2 px-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none"
                                placeholder="Search..."
                                ref={searchRef}
                                onChange={handleSearchInput}
                                required
                            />
                        </div>

                        <button
                            className="border  border-[none] rounded-lg p-2 px-3 bg-blue-700 text-start text-white"
                            onClick={() => setShowModal(true)}
                        >
                            + Add New Medicines
                        </button>
                    </div>
                    {showModel && (
                        <MedicineModal onClose={() => setShowModal(false)} />
                    )}
                    {medicineDataIsLoading ? (
                        <Loader />
                    ) : medicineDataIsError ? (
                        <ErrorPage />
                    ) : !medicineData.length ? (
                        <NothingToShow />
                    ) : (
                        <div className="flex flex-col gap-3 w-[100%] justify-center ">
                            {medicineData?.length ? (
                                medicineData.map((item) => {
                                    return (
                                        <MedicineCard
                                            image={item.images[0]}
                                            page={page}
                                            id={item._id}
                                            key={item._id}
                                            name={item.name}
                                            price={item.price}
                                            manufacturer={item.manufacturerName}
                                            packSizeLabel={item.packSizeLabel}
                                            compositions={item.compositions}
                                        />
                                    );
                                })
                            ) : (
                                <div className="flex justify-center items-center h-[70vh]">
                                    No such medicine Found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-5 mx-auto mt-auto">
                <ReactPagination setPage={setPage} total={total} />
                <div className="mt-4">
                    {' '}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AllMedicinesPage;
