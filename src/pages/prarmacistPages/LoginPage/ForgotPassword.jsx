import React, { useRef, useState } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import Button from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { notify } from '../../../App';
import axios from 'axios';
import PasswordInput from '../../../components/PasswordInput';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const pharmaEmail = new URLSearchParams(location.search).get('email')
    const password = useRef();
    const confirmPassword = useRef();

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
                        password: password.current.value
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${pharmaEmail}`
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

        </>
    );
};

export default ForgotPassword;
