import { useState, useRef, useEffect } from 'react';
import CustomerData from './components/CustomerData.jsx';
import Footer from '../../../components/Footer.jsx';
import ReactPaginate from '../../../components/ReactPaginate';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAllCustomerList,
    searchedCustomer
} from '../../../features/adminAllCustomersSlice.js';
import Loader from '../../../components/Loader.jsx';
import NothingToShow from '../../../components/NothingToShow.jsx';
import ErrorPage from '../../../components/ErrorPage.jsx';

const CustomerListPage = () => {
    const [page, setPage] = useState(0);
    const total = useSelector((state) => state.adminAllCustomer.total);
    const searchRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCustomerList(page));
    }, [page]);

    const handleSearch = () => {
        if (searchRef.current.value === '') {
            dispatch(fetchAllCustomerList(0));
        }
        dispatch(searchedCustomer(searchRef.current.value.trim()));
    };

    const allCustomers = useSelector((state) => state.adminAllCustomer.data);
    const allCustomersIsError = useSelector(
        (state) => state.adminAllCustomer.isError
    );
    const allCustomersIsLoading = useSelector(
        (state) => state.adminAllCustomer.isLoading
    );

    return allCustomersIsLoading ? (
        <Loader />
    ) : allCustomersIsError ? (
        <ErrorPage />
    ) : !allCustomers.length ? (
        <NothingToShow />
    ) : (
        <div className="p-1 md:pt-5 bg-[#EBF6F9] w-[100%] min-h-[90vh] flex flex-col">
            <div className="overflow-x-scroll  no-scrollbar px-3">
                <div className=" flex justify-between min-w-[760px] max-w-[1200px] mx-auto mb-5">
                    <h4 className="my-auto">All Customers</h4>
                    <form className="max-w-md">
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
                                placeholder="Search User..."
                                required
                            />
                        </div>
                    </form>
                </div>
                <div className="min-w-[760px] max-w-[1200px] mx-auto border rounded-lg bg-white">
                    <div className="grid grid-cols-6 ps-5  py-2 border-b-[0.03rem] text-[0.9rem] text-slate-400 font-default-font-family">
                        <div className=" col-span-1">Name</div>
                        <div className=" col-span-1">Phone No.</div>
                        <div className=" col-span-3">Address</div>
                        <div className=" col-span-1 ms-3">Block/Unblock</div>
                    </div>
                    <CustomerData />
                </div>
            </div>
            <div className="mx-auto mt-auto flex flex-col gap-5">
                <ReactPaginate setPage={setPage} total={total / 10} />
                <Footer />
            </div>
        </div>
    );
};

export default CustomerListPage;
