import React, { useEffect, useRef, useState } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import PasswordInput from '../../../components/PasswordInput';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import {
    fetchPharmacistDetails,
    loginPharmacist
} from '../../../features/pharmacistDetailsSlice';
import { notify } from '../../../App';
import { checkEmail } from '../../../validators/validatZod';
import { checkPassword } from '../../../validators/validatZod';

const PharmaLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rememberMe, setRememberMe] = useState(false);
    const userMail = useRef();
    const userPassword = useRef();
    const [errorMail, setErrorMail] = useState(null);
    const [errorPass, setErrorPass] = useState(null);
    const [eye, setEye] = useState(false);
    const pharmacistStatus = useSelector((state) => state.pharmacist.data);
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

    const handleLogin = () => {
            dispatch(
                loginPharmacist({
                    email: userMail.current.value.trim(),
                    password: userPassword.current.value.trim(),
                    rememberMe: rememberMe
                })
            );
            dispatch(fetchPharmacistDetails());
        
    };

    useEffect(() => {
        if (pharmacistStatus) navigate('../pharmacist/orders/all');
    }, [pharmacistStatus]);

    return (
        <>
            <AuthenticationTemplate>
                <h1 className=" text-[1.5rem]">Welcome Back!</h1>
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1 py-2 h-[5rem]">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Email ID <sup>*</sup>
                        </p>
                        <input
                            type="text"
                            placeholder="example@mail.com"
                            ref={userMail}
                            onChange={() => {
                                const resEmail = checkEmail.safeParse({
                                    email: userMail.current.value
                                });
                                resEmail.success
                                    ? setErrorMail('')
                                    : setErrorMail(
                                        resEmail.error.issues.map(
                                            (err) => err.message
                                        )
                                    );
                            }}
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                        />
                        {errorMail !== '' ? (
                            <span className=" text-red ms-auto text-[0.65rem]">
                                {errorMail}
                            </span>
                        ) : (
                            <span>{''}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 py-2 h-[5rem] mb-3">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Password<sup>*</sup>
                        </p>
                        <div className=" flex  justify-between outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md">
                            <input
                                type={type}
                                placeholder="m#P52s@ap$V"
                                ref={userPassword}
                                onChange={() => {
                                    const resPassword =
                                        checkPassword.safeParse({
                                            password: userPassword.current.value
                                        });
                                    resPassword.success
                                        ? setErrorPass('')
                                        : setErrorPass(
                                            resPassword.error.issues.map(
                                                (err) => err.message
                                            )
                                        );
                                }}
                                className=" outline-none font-default-font-family w-[100%] "
                            />
                            {eye ? (
                                <FaRegEye
                                    onClick={handleEye}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    onClick={handleEye}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                        {errorPass !== '' ? (
                            <span className=" text-red ms-auto text-[0.65rem]">
                                {errorPass}
                            </span>
                        ) : (
                            <span>{''}</span>
                        )}
                    </div>



                    <div className="flex justify-between items-center ">
                        <div className="flex gap-2">
                            <input
                                className="cursor-pointer"
                                checked={rememberMe}
                                type="checkbox"
                                id="remember"
                                onChange={() => {
                                    setRememberMe((prev) => !prev);
                                }}
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-[#1444EF] cursor-pointer"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            to={'/send-email'}
                            className="text-sm  text-text-grey font-default-font-family cursor-pointer"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Button type="button"
                        handleClick={() => {
                            if (
                                errorMail === null &&
                                errorPass === null
                            ) {
                                setErrorMail('Feild requied');
                                setErrorPass('Feild requied');
                            }
                            if (userMail?.current?.value?.trim() === ''){
                                notify('Please provide email Id');
                                return;
                            }
                            else if (userPassword.current.value.trim() === '')
                                {notify('Please provide a valid password');
                                    return;
                                }
                            else if (errorMail === '' && errorPass === '')
                                handleLogin();
                        }}
                    >
                        Sign In
                    </Button>
                    <div className="text-sm text-center  text-gray-600 font-default-font-family mt-1">
                        No account yet?{' '}
                        <span className="text-[#1444EF]">
                            <Link to={'/pharma-register'}>Sign Up</Link>
                        </span>
                    </div>
                </div>
            </AuthenticationTemplate>
        </>
    );
};

export default PharmaLogin;
