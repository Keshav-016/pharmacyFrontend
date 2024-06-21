import React, { useState } from 'react';

import CustomerData from './components/CustomerData.jsx';
import ReactPaginate from '../../../components/ReactPaginate.jsx';
import Footer from '../../../components/Footer.jsx';
import { useSelector } from 'react-redux';

const AllOrderPage = () => {
    const [page, setPage] = useState(0);
    const total = useSelector((state) => state.adminAllOrder.total);

    return (
        <div className="bg-[#EBF6F9] min-h-[90vh] pt-10 flex flex-col">
            <CustomerData page={page} />
            <div className="mx-auto mt-auto flex flex-col gap-5 ">
                <ReactPaginate setPage={setPage} total={total / 10} />
                <div className=" mt-4">
                    {' '}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AllOrderPage;
