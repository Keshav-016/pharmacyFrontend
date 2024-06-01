const Button = ({ children, type, handleClick }) => {
    return (
        <>
            <button
                type={type}
                onClick={handleClick}
                className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-lg rounded-md lg:text-normal text-[0.8rem] "
            >
                {children}
            </button>
        </>
    );
};

export default Button;
