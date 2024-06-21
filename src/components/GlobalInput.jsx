const GlobalInput = ({
    inputLabel,
    placeholder,
    refValue,
    value,
    type,
    handleChange,
    maxlength,
    required = false,
    id
}) => {
    return (
        <div className="flex flex-col gap-1 py-2 h-[5rem]">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {inputLabel}
                {required ? <span className="ms-1">*</span> : ''}
            </p>
            <input
                id={id}
                maxLength={maxlength}
                defaultValue={value}
                type={type}
                placeholder={placeholder}
                ref={refValue}
                onChange={handleChange}
                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
            />
        </div>
    );
};

export default GlobalInput;
