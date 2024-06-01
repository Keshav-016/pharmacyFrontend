import { useEffect, useRef } from 'react';
import Button from '../../../../components/Button';
import GlobalInput from '../../../../components/GlobalInput';
import { useDispatch } from 'react-redux';
import { updatePharmacistPassword } from '../../../../features/pharmacistDetailsSlice';
import { current } from '@reduxjs/toolkit';
import { notify } from '../../../../App';
import PasswordInput from '../../../../components/PasswordInput';

const PharmacistProfilePassword = () => {
    const oldPassword = useRef();
    const newPassword = useRef();
    const confirmPassword = useRef();

    const dispatch = useDispatch();

    const updatePassword = (e) => {
        e.preventDefault();
        if (oldPassword.current.value.trim() === '')
            notify('Old Password is a required field');
        else if (newPassword.current.value.trim() === '')
            notify('New Password is a required field');
        else if (confirmPassword.current.value.trim() === '')
            notify('Confirm Password is a required field');
        else if (newPassword.current.value !== confirmPassword.current.value)
            notify('New password and Confirm Password does not match');
        else {
            const passwordObject = {
                password: oldPassword.current.value,
                newPassword: newPassword.current.value,
                confirmPassword: confirmPassword.current.value
            };
            dispatch(updatePharmacistPassword(passwordObject));
            oldPassword.current.value = null;
            newPassword.current.value = null;
            confirmPassword.current.value = null;
        }
    };

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 h-[100%]">
                <h2 className="text-[1.2rem] font-medium">Password</h2>

                <form className="mt-4">
                    <PasswordInput
                        inputLabel={'Old Password'}
                        placeholder={'passwrd'}
                        type={'password'}
                        refValue={oldPassword}
                        required={true}
                        password={true}
                    />
                    <GlobalInput
                        inputLabel={'New Password'}
                        type={'password'}
                        placeholder={'.....'}
                        refValue={newPassword}
                    />
                    <PasswordInput
                        inputLabel={'Confirm Password'}
                        type={'password'}
                        placeholder={'.....'}
                        refValue={confirmPassword}
                    />
                    <div className="w-[30%] ms-auto mt-10">
                        <Button handleClick={updatePassword}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PharmacistProfilePassword;
