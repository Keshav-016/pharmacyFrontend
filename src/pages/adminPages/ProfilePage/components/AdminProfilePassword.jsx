import { useRef, useState } from 'react';
import Button from '../../../../components/Button';
import PasswordInput from '../../../../components/PasswordInput';
import showAlert from '../../../../components/showAlert';
import { notify } from '../../../../App';
import axios from 'axios';

const AdminProfilePassword = () => {
    const oldPassRef = useRef();
    const newPassRef = useRef();
    const matchNewPassRef = useRef();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [matchNewPass, setMatchNewPass] = useState('');

    const checkPasswordMatch = () => {
        if (newPass !== matchNewPass) {
            console.log("New Password doesn't match");
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
        try {
            if (checkPasswordMatch()) {
                const adminToken = localStorage.getItem('token');
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
