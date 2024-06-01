import { useDispatch, useSelector } from 'react-redux';
import ProductCards from '../../../components/ProductCards';
import { useEffect, useState } from 'react';
import { fetchProductLists } from '../../../features/productSlice';
import ReactPaginate from 'react-paginate';

const Products = () => {
    const productList = useSelector((state) => state.product.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductLists(0));
    }, []);

    const handleaPageClick = (data) => {
        dispatch(fetchProductLists(data.selected + 1));
    };

    return (
        <>
            <div className=" md:px-[5rem] lg:px-44 bg-[#EBF6F9] flex flex-col justify-center items-center min-h-[90vh] ">
                <div className=" grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 justify-items-center content-center max-w-[1400px] mx-auto py-10 gap-10">
                    {productList?.map((item) => (
                        <ProductCards itemProduct={item} key={item._id} />
                    ))}
                </div>
                {productList?.length >= 12 ? (
                    <div className="w-[100%] pb-20 mt-5 text-center">
                        <ReactPaginate
                            breakLabel={'...'}
                            pageCount={20000}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={2}
                            onPageChange={handleaPageClick}
                            containerClassName="inline-flex -space-x-px text-sm "
                            pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            breakClassName="'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default Products;
