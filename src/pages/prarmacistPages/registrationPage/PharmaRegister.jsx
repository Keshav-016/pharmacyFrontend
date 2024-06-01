import { Link, useNavigate } from 'react-router-dom';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import Button from '../../../components/Button';
import GlobalInput from '../../../components/GlobalInput';
import { useRef, useState } from 'react';
import axios from 'axios';
import { notify } from '../../../App';
import PasswordInput from '../../../components/PasswordInput';

const PharmaRegister = () => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const newEmailRef = useRef();
    const phoneRef = useRef();
    const newPassRef = useRef();
    const confirmPassRef = useRef();
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            if (
                !nameRef.current.value.trim() ||
                !newEmailRef.current.value.trim() ||
                !newPassRef.current.value.trim() ||
                !confirmPassRef.current.value.trim()
            ) {
                notify('Fill all the fields');
            } else if (
                !(newPassRef.current.value === confirmPassRef.current.value)
            ) {
                notify('New Password and Confirmed Password Does not match');
            } else if (!agreeTerms) {
                notify('Read Terms and coditions and aceept it first');
            } else {
                const rawData = await axios({
                    method: `post`,
                    url: `http://localhost:3003/pharmacist/register`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        name: nameRef.current.value,
                        email: newEmailRef.current.value,
                        phone: phoneRef.current.value,
                        password: newPassRef.current.value,
                        role: 'user'
                    }
                });
                notify('You are Successfully Registered', 'success');
                navigate('/pharma-login');
            }
        } catch (error) {
            notify(error.response?.data?.message);
        }
    };

    return (
        <AuthenticationTemplate SubHeading="Create Your Account">
            <GlobalInput
                inputLabel="Name"
                type="text"
                placeholder="Jhon Doe"
                refValue={nameRef}
                required={true}
            />
            <GlobalInput
                inputLabel="Email ID"
                type="email"
                placeholder="example@mail.com"
                refValue={newEmailRef}
                required={true}
            />
            <GlobalInput
                inputLabel="Phone Number"
                type="email"
                placeholder="1234567890"
                refValue={phoneRef}
                required={true}
            />
            <PasswordInput
                inputLabel="Password"
                placeholder="John@1234"
                refValue={newPassRef}
                required={true}
            />
            <PasswordInput
                inputLabel="Confirm Password"
                placeholder="John@1234"
                refValue={confirmPassRef}
                required={true}
            />
            <div>
                <input
                    type="checkbox"
                    id="conditions"
                    className=" cursor-pointer"
                    onChange={() => setAgreeTerms((prev) => !prev)}
                />{' '}
                <label
                    htmlFor="conditions"
                    className="text-sm text-[#1444EF] cursor-pointer"
                >
                    I agree with the terms & conditions
                </label>
            </div>
            <Button handleClick={handleRegistration} type={'submit'}>
                Sign Up
            </Button>
            <div className="text-sm text-center mt-1">
                Already have an account?{' '}
                <span className="text-[#1444EF]">
                    <Link to={'/pharma-login '}>Sign In</Link>
                </span>
            </div>
        </AuthenticationTemplate>
    );
};

export default PharmaRegister;
