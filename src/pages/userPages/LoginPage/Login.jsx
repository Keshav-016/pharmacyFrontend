import Button from '../../../components/Button';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import GlobalInput from '../../../components/GlobalInput';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../features/userSlice';
import { useRef } from 'react';
import { notify } from '../../../App';

const Login = () => {
    const emailRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitLogIn = async (e) => {
        e.preventDefault();
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRef.current.value.match(emailRegex)) {
            dispatch(fetchUser({ email: emailRef.current.value }));
            navigate(`/verify-email?email=${emailRef.current.value}`);
        } else {
            notify('Enter correct email!');
            emailRef.current.value = '';
        }
    };

    return (
        <>
            <AuthenticationTemplate SubHeading="Welcome to medigen!">
                <div className="flex flex-col gap-4">
                    <GlobalInput
                        inputLabel="Email ID"
                        type="email"
                        placeholder="example@mail.com"
                        refValue={emailRef}
                    />
                    <Button type="submit" handleClick={submitLogIn}>
                        Continue
                    </Button>
                </div>
            </AuthenticationTemplate>
        </>
    );
};

export default Login;
