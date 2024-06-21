import { useState } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import OtpInput from 'react-otp-input';
import Button from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUser, verifyUserOtp } from '../../../features/userSlice';
import { useDispatch } from 'react-redux';
import { notify } from '../../../App';
import axios from 'axios';
import ButtonOutlined from '../../../components/ButtonOutlined';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const dispatch = useDispatch();

    const handleVerify = async () => {
        try {
            const rawData = await axios({
                method: 'post',
                url: `http://localhost:3003/customers/verify-otp`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    otp: otp
                }
            });
            localStorage.setItem('token', rawData.data.data.token);
            navigate('/');
        } catch (e) {
            notify(e.response.data.message);
        }
    };

    const handleResendOtp = () => {
        dispatch(fetchUser({ email, otp }));
        notify('OTP resend, check email', 'success');
    };

    return (
        <AuthenticationTemplate SubHeading="Verify Email">
            <div className="flex flex-col gap-5 max-w-[100vw]">
                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                    Enter 4 digit code sent {email}
                </p>
                <div className="flex items-center justify-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={null}
                        inputStyle={{
                            marginRight: '30px',
                            border: `1px solid #D9E1E8`,
                            borderRadius: `5px`,
                            height: '3rem',
                            width: '3rem'
                        }}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <div className="flex flex-col my-3 gap-2">
                    <Button handleClick={handleVerify}>Verify</Button>
                    <ButtonOutlined handleClick={handleResendOtp}>
                        Resend
                    </ButtonOutlined>
                </div>
            </div>
        </AuthenticationTemplate>
    );
};

export default VerifyEmail;
