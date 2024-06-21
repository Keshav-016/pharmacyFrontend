import React, { useRef} from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import GlobalInput from '../../../components/GlobalInput';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { sendPasswordLink} from '../../../features/pharmacistDetailsSlice';
import { notify } from '../../../App';


const SendLink = () => {
    const dispatch = useDispatch();
    const email = useRef();

    const handleSendOtp = () => {
        if (email.current.value === '') {
            notify('Please Enter email');
            return;
        }
        dispatch(
            sendPasswordLink({ email: email.current.value})
        );
    };

    return (
        <>
            <AuthenticationTemplate SubHeading="Forgot Password">
                <GlobalInput
                    inputLabel="Email Id"
                    placeholder="abc@gmail.com"
                    refValue={email}
                />

                <div>
                    <Button handleClick={handleSendOtp}>Send Link</Button>
                </div>

            </AuthenticationTemplate>

        </>
    );
};

export default SendLink;
