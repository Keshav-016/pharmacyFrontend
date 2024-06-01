import React from 'react';

function ButtonOutlined({ children, type, handleClick }) {
    return (
        <>
            <button
                type={type}
                onClick={handleClick}
                className="w-[100%] border border-[#1444EF] text-[#1444EF] lg:p-3 p-[0.4rem] font-default-font-family hover:bg-[#1444EF] hover:text-[#FFFF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem]"
            >
                {children}
            </button>
        </>
    );
}

export default ButtonOutlined;
