import React from 'react';

const TableHeading = () => {
    return (
        <div className="grid grid-cols-12 min-w-[650px] justify-center text-start  border-b-[0.03rem] text-[0.6rem] text-slate-400">
            <div className="col-span-3 text-start border-b-[0.04rem] overflow-scroll no-scrollbar p-2 px-8">
                OrderID:
            </div>
            <div className="col-span-2 text-start border-b-[0.04rem] overflow-scroll no-scrollbar p-2 px-8">
                CustomerName:
            </div>
            <div className="col-span-2 text-start border-b-[0.04rem] overflow-scroll no-scrollbar p-2 px-8">
                OrderDate/Time
            </div>
            <div className="col-span-3 text-start border-b-[0.04rem] overflow-scroll no-scrollbar p-2 px-8">
                Customer Address:
            </div>
            <div className="col-span-2 text-start border-b-[0.04rem] overflow-scroll no-scrollbar p-2 px-8">
                Status
            </div>
        </div>
    );
};

export default TableHeading;
