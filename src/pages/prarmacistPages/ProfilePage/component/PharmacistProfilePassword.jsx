import { useRef } from 'react';
import Button from '../../../../components/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePharmacistPassword } from '../../../../features/pharmacistDetailsSlice';
import { notify } from '../../../../App';
import PasswordInput from '../../../../components/PasswordInput';
import { checkPassword } from '../../../../validators/validatZod';

const PharmacistProfilePassword = () => {
    const oldPassword = useRef();
    const newPassword = useRef();
    const confirmPassword = useRef();
    const [errorPass, setErrorPass] = useState('');

    const dispatch = useDispatch();

    const checkZodValidation = () => {
        const resPassword = checkPassword.safeParse({
            password: newPassword.current.value
        });
        if (resPassword.success) {
            return true;
        } else {
            setErrorPass(resPassword.error.issues.map((err) => err.message));
            notify(errorPass[0]);
            return false;
        }
    };

    const updatePassword = (e) => {
        e.preventDefault();
        if (oldPassword.current.value.trim() === '') {
            notify('Old Password is a required field');
            return;
        } else if (newPassword.current.value.trim() === '') {
            notify('New Password is a required field');
            return;
        } else if (confirmPassword.current.value.trim() === '') {
            notify('Confirm Password is a required field');
            return;
        } else if (
            newPassword.current.value !== confirmPassword.current.value
        ) {
            notify('New password and Confirm Password does not match');
            return;
        } else {
            const passwordObject = {
                password: oldPassword.current.value,
                newPassword: newPassword.current.value,
                confirmPassword: confirmPassword.current.value
            };
            if (checkZodValidation()) {
                dispatch(updatePharmacistPassword(passwordObject));
                oldPassword.current.value = null;
                newPassword.current.value = null;
                confirmPassword.current.value = null;
            }
        }
    };

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 h-[100%]">
                <h2 className="text-[1.2rem] font-medium">Password</h2>

                <form className="mt-4">
                    <PasswordInput
                        inputLabel={'Old Password'}
                        placeholder={'John@1234'}
                        type={'password'}
                        refValue={oldPassword}
                        required={true}
                        password={true}
                    />
                    <PasswordInput
                        inputLabel={'New Password'}
                        type={'password'}
                        placeholder={'John@1234'}
                        refValue={newPassword}
                        required={true}
                        password={true}
                    />
                    <PasswordInput
                        inputLabel={'Confirm Password'}
                        type={'password'}
                        placeholder={'John@1234'}
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
