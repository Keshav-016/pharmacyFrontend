import React, { useEffect, useRef, useState } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import GlobalInput from '../../../components/GlobalInput';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPharmacistDetails,
    loginPharmacist
} from '../../../features/pharmacistDetailsSlice';
import { notify } from '../../../App';
const PharmaLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rememberMe, setRememberMe] = useState(false);
    const userMail = useRef();
    const userPassword = useRef();
    const pharmacistStatus = useSelector((state) => state.pharmacist.data);

    const handleLogin = () => {
        if (userMail?.current?.value?.trim() === '')
            notify('Please provide email Id');
        else if (userPassword.current.value.trim() === '')
            notify('Please provide a valid password');
        else {
            dispatch(
                loginPharmacist({
                    email: userMail.current.value.trim(),
                    password: userPassword.current.value.trim(),
                    rememberMe: rememberMe
                })
            );
            dispatch(fetchPharmacistDetails());
        }
    };

    useEffect(() => {
        if (pharmacistStatus) navigate('../pharmacist/orders/all');
    }, [pharmacistStatus]);

    return (
        <>
            <AuthenticationTemplate>
                <h1 className=" text-[1.5rem]">Welcome Back!</h1>
                <div className="flex flex-col gap-4">
                    <GlobalInput
                        inputLabel="Email ID"
                        type="email"
                        placeholder="example@mail.com"
                        refValue={userMail}
                    />
                    <GlobalInput
                        inputLabel="Password"
                        type="password"
                        placeholder="********"
                        refValue={userPassword}
                    />
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
                            to={'/password'}
                            className="text-sm  text-text-grey font-default-font-family cursor-pointer"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Button type="button" handleClick={handleLogin}>
                        Sign In
                    </Button>
                    <div className="text-sm text-center text-grey font-default-font-family mt-1">
                        No account yet?{' '}
                        <span className="text-[#1444EF]">
                            <Link to={'/register'}>Sign Up</Link>
                        </span>
                    </div>
                </div>
            </AuthenticationTemplate>
        </>
    );
};

export default PharmaLogin;
