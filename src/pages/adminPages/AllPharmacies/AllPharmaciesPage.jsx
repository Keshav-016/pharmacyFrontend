import React, { useEffect, useRef, useState } from 'react';
import PharmaciesCard from './components/PharmaciesCard';
import Footer from '../../../components/Footer';
import ReactPagination from '../../../components/ReactPaginate';
import PharmaciesUnapproved from './components/PharmaciesUnapproved';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPharmaciesDetails,
    searchedPharmacy
} from '../../../features/getPharmaciesSlice';
import Loader from '../../../components/Loader';
import NothingToShow from '../../../components/NothingToShow';
import ErrorPage from '../../../components/ErrorPage';

const AllPharmaciesPage = () => {
    const [page, setPage] = useState(0);
    const total = useSelector((state) => state.pharmacies.total);
    const searchRef = useRef();
    const pharmaciesData = useSelector((state) => state.pharmacies.data);
    
    const pharmaciesDataIsLoading = useSelector(
        (state) => state.pharmacies.isLoading
    );
    const pharmaciesDataIsError = useSelector(
        (state) => state.pharmacies.isError
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPharmaciesDetails(page));
    }, [page]);

    const handleSearch = () => {
        if (searchRef.current.value === '') {
            dispatch(getPharmaciesDetails(0));
        }
        dispatch(searchedPharmacy(searchRef.current.value.trim()));
    };

    return (
        <div className=" bg-[#EBF6F9] min-h-[90vh] flex flex-col">
            <div className=" overflow-x-scroll no-scrollbar">
                <div className="min-w-[760px] max-w-[1200px] mx-auto">
                    <div className="flex px-2 justify-between mt-6">
                        <h3 className="my-auto">All Pharmacies</h3>
                        <div>
                            <form className="max-w-md mx-auto">
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
                                        ref={searchRef}
                                        onChange={handleSearch}
                                        id="default-search"
                                        className="block w-full p-2 px-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white outline-none"
                                        placeholder="Pharmacy Name..."
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    {pharmaciesDataIsLoading ? (
                        <Loader />
                    ) : pharmaciesDataIsError ? (
                        <ErrorPage />
                    ) : !pharmaciesData.length ? (
                        <NothingToShow />
                    ) : (
                        <div className="flex flex-col px-2  gap-3 max-w-[1200px] max-h-[59vh] overflow-scroll no-scrollbar">
                            {pharmaciesData?.length ? (
                                pharmaciesData?.map((item) =>
                                    item.isApproved ? (
                                        <PharmaciesCard
                                            PharmaData={item}
                                            key={item?._id}
                                        />
                                    ) : (
                                        <PharmaciesUnapproved
                                            PharmaData={item}
                                            key={item?._id}
                                        />
                                    )
                                )
                            ) : (
                                <div className="flex justify-center items-center h-[60vh]">
                                    No such pharmacy Found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-5 mt-auto mx-auto">
                <ReactPagination setPage={setPage} total={total / 10} />
                <div className="mt-4">
                    {' '}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AllPharmaciesPage;
