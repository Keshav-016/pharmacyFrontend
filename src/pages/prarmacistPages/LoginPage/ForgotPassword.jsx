import React, { useRef, useState } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import GlobalInput from '../../../components/GlobalInput';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { sendOtp, verifyOtp } from '../../../features/pharmacistDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../App';
import axios from 'axios';
import PasswordInput from '../../../components/PasswordInput';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [pharmaEmail, setPharmaEmail] = useState();
    const email = useRef();
    const enteredOtp = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleSendOtp = () => {
        if (email.current.value === '') {
            notify('Please Enter email');
            return;
        }
        dispatch(
            sendOtp({ email: email.current.value, setShowOtp: setShowOtp })
        );
    };

    const handleVerifyOtp = () => {
        if (enteredOtp.current.value.trim() === '') notify('Please Enter Otp');
        else {
            dispatch(
                verifyOtp({
                    email: email.current.value,
                    otp: enteredOtp.current.value,
                    setChangePassword: setChangePassword
                })
            );
            setPharmaEmail(email.current.value);
        }
    };

    const handlePasswordChange = async () => {
        try {
            if (password.current.value.trim() === '')
                notify('Please Enter New Password');
            else if (confirmPassword.current.value.trim() === '')
                notify('Please Confirm New Password');
            else if (
                !(password.current.value === confirmPassword.current.value)
            )
                notify('New Password and Confirmed Password Does not match');
            else {
                await axios({
                    method: 'PUT',
                    url: `http://localhost:3003/pharmacist/forgot-password`,
                    data: {
                        email: pharmaEmail,
                        password: password.current.value
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                notify('Password Changed Successfully', 'success');
                navigate('/pharma-login');
            }
        } catch (error) {
            console.log(error.response.data.message);
            notify(error.response.data.message);
        }
    };

    return (
        <>
            {changePassword ? (
                <AuthenticationTemplate SubHeading="Reset Password">
                    <>
                        <PasswordInput
                            inputLabel="New Password"
                            placeholder={'*********'}
                            type={'password'}
                            refValue={password}
                            required={true}
                        />
                        <PasswordInput
                            inputLabel="Confirm Password"
                            placeholder={'*********'}
                            type={'password'}
                            refValue={confirmPassword}
                            required={true}
                        />
                        <Button handleClick={handlePasswordChange}>
                            Save Changes
                        </Button>
                    </>
                </AuthenticationTemplate>
            ) : (
                <AuthenticationTemplate SubHeading="Forgot Password">
                    <GlobalInput
                        inputLabel="Email Id"
                        placeholder="abc@gmail.com"
                        refValue={email}
                    />
                    {showOtp ? (
                        <>
                            <GlobalInput
                                inputLabel="Enter Otp"
                                placeholder="OTP"
                                refValue={enteredOtp}
                                maxLength={'4'}
                            />{' '}
                            <Button handleClick={handleVerifyOtp}>
                                Verify Otp
                            </Button>
                        </>
                    ) : (
                        <div>
                            <Button handleClick={handleSendOtp}>Get Otp</Button>
                        </div>
                    )}
                </AuthenticationTemplate>
            )}
        </>
    );
};

export default ForgotPassword;
