import { useRef, useState } from 'react';
import Button from '../../../../components/Button';
import PasswordInput from '../../../../components/PasswordInput';
import { checkPassword } from '../../../../validators/validatZod';
import showAlert from '../../../../components/showAlert';
import { notify } from '../../../../App';
import axios from 'axios';

const AdminProfilePassword = () => {
    const oldPassRef = useRef();
    const newPassRef = useRef();
    const matchNewPassRef = useRef();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [errorPass, setErrorPass] = useState([]);
    const [matchNewPass, setMatchNewPass] = useState('');

    const checkPasswordMatch = () => {
        if (newPass !== matchNewPass) {
            notify("New Password doesn't match");
            return false;
        }
        return true;
    };

    const changeAdminPassword = async () => {
        if (oldPass === '' && newPass === '') {
            notify('Feilds requied!');
            return;
        }
        if (oldPass === newPass) {
            notify('Old Password Cannot Be Same As New Password');
            return;
        }

        const checkZodValidation = () => {
            const resPassword = checkPassword.safeParse({
                password: newPass
            });
            if (resPassword.success) {
                return true;
            } else {
                setErrorPass(
                    resPassword.error.issues.map((err) => err.message)
                );
                notify(errorPass[0]);
                return false;
            }
        };

        try {
            if (checkPasswordMatch() && checkZodValidation()) {
                const adminToken = localStorage.getItem('adminToken');
                const rawData = await axios({
                    method: 'put',
                    url: 'http://localhost:3003/admin/update-password',
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        password: oldPass,
                        newPassword: newPass
                    }
                });
                oldPassRef.current.value='';
                newPassRef.current.value='';
                matchNewPassRef.current.value='';
                rawData.data.message === 'success'
                    ? showAlert('success', 'Password updated successfully')
                    : notify('Unable to update password!');
            }
        } catch (err) {
            notify(err.response.data.message);
        }
    };

    const getOldPassword = () => {
        setOldPass(oldPassRef.current.value);
    };
    const getNewPassword = () => {
        setNewPass(newPassRef.current.value);
    };
    const getReEnteredPassword = () => {
        setMatchNewPass(matchNewPassRef.current.value);
    };

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 h-[100%]">
                <h2 className="text-[1.5rem] font-default-font-family font-medium">
                    Password
                </h2>
                <form className="mt-4">
                    <PasswordInput
                        inputLabel={'Old Password'}
                        placeholder={'John@2377'}
                        type={'password'}
                        refValue={oldPassRef}
                        handleChange={getOldPassword}
                        value={oldPass}
                        key={true}
                        required={true}
                    />
                    <PasswordInput
                        inputLabel={'New Password'}
                        type={'password'}
                        placeholder={'Edwerd@1234'}
                        refValue={newPassRef}
                        handleChange={getNewPassword}
                        value={newPass}
                        required={true}
                    />
                    <PasswordInput
                        inputLabel={'Confirm Password'}
                        type={'password'}
                        placeholder={'Edwerd@1234'}
                        refValue={matchNewPassRef}
                        handleChange={getReEnteredPassword}
                        value={matchNewPass}
                        required={true}
                    />
                    <div className="w-[30%] ms-auto mt-10">
                        <Button type="button" handleClick={changeAdminPassword}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminProfilePassword;
