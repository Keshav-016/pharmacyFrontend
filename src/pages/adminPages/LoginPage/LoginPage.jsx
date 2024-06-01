import React, { useRef } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import GlobalInput from '../../../components/GlobalInput';
import Button from '../../../components/Button';
import PasswordInput from '../../../components/PasswordInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();

    function emailIsValid(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const notify = (msg) => toast(msg);

    const authenticateAdmin = async (email, password) => {
        try {
            const rawData = await axios({
                method: 'post',
                url: 'http://localhost:3003/admin/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    password: password
                }
            });
            navigate('/admin/customer-list');
            localStorage.setItem('token', rawData.data.data.token);
        } catch (err) {
            notify(err.response.data.message);
        }
    };

    const submitLogIn = async (e) => {
        if (emailIsValid(emailRef.current.value)) {
            authenticateAdmin(emailRef.current.value, passRef.current.value);
        } else {
            notify('Invalid email');
        }
    };

    return (
        <>
            <AuthenticationTemplate SubHeading="Welcome Back!">
                <GlobalInput
                    inputLabel="Email Id"
                    placeholder="John@gmail.com"
                    type="email"
                    refValue={emailRef}
                />
                <PasswordInput
                    inputLabel="Password"
                    required="true"
                    placeholder="*****"
                    type="password"
                    refValue={passRef}
                />

                <input
                    type="button"
                    value={'Sign In'}
                    onClick={submitLogIn}
                    className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                />
                <ToastContainer />
            </AuthenticationTemplate>
        </>
    );
};

export default LoginPage;
