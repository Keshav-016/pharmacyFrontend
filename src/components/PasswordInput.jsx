import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
    inputLabel,
    placeholder,
    refValue,
    value,
    handleChange,
    maxlength,
    required = false
}) => {
    const [eye, setEye] = useState(false);
    const [type, setType] = useState('password');

    const handleEye = () => {
        if (!eye) {
            setType('text');
            setEye(true);
        } else {
            setType('password');
            setEye(false);
        }
    };

    return (
        <div className="flex flex-col gap-1 py-2">
            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                {inputLabel}
                {required ? <span className="ms-1">*</span> : ''}
            </p>
            <div className=" flex border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] rounded-md">
                <input
                    className=" w-full outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] text-[0.9rem] font-medium"
                    maxlength={maxlength}
                    defaultValue={value}
                    type={type}
                    placeholder={placeholder}
                    ref={refValue}
                    onChange={handleChange}
                />
                {eye ? (
                    <FaRegEye onClick={handleEye} />
                ) : (
                    <FaRegEyeSlash onClick={handleEye} />
                )}
            </div>
        </div>
    );
};

export default PasswordInput;
