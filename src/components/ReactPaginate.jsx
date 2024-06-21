import React from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import { BiSolidLeftArrow } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

const ReactPagination = ({ setPage, total }) => {
    const handlePageClick = (data) => {
        setPage(data.selected);
    };
    const totalPage = Math.ceil(total);

    return (
        <>
            {totalPage > 0 ? (
                <ReactPaginate
                    previousLabel={<BiSolidLeftArrow />}
                    nextLabel={<BiSolidRightArrow />}
                    breakLabel={'...'}
                    pageCount={totalPage}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'flex items-center justify-center mt-7'}
                    pageLinkClassName={
                        ' flex mr-2 items-center justify-center px-3 h-8 leading-tight  border border-gray-300 rounded-md hover:bg-blue-700 hover:text-white'
                    }
                    previousLinkClassName={
                        ' flex mr-2 items-center justify-center px-3 h-8 ms-0 leading-tight text-black  rounded-md hover:bg-blue-700 hover:text-white '
                    }
                    nextLinkClassName={
                        ' flex mr-2 items-center justify-center px-3 h-8 leading-tight text-black  rounded-md hover:bg-blue-700 hover:text-white '
                    }
                    breakLinkClassName={
                        ' flex mr-2 items-center justify-center px-3 h-8 leading-tight text-black  border border-gray-300 rounded-md hover:bg-blue-700 hover:text-white '
                    }
                    activeLinkClassName=" flex mr-2 items-center justify-center px-3 bg-[#1444ef] text-white border border-gray-300 hover:bg-[#!444ef] rounded-md hover:text-white"
                />
            ) : (
                ''
            )}
        </>
    );
};

export default ReactPagination;
