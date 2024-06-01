import React from 'react';
import AuthenticationTemplate from '../components/AuthenticationTemplate';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const RoleModal = () => {
    const navigate = useNavigate();
    const changeRoute = (route) => {
        navigate(route);
    };

    return (
        <div>
            <AuthenticationTemplate>
                <h2>How do you wish to continue..</h2>
                <div className=" flex gap-5">
                    <Button handleClick={() => changeRoute('/pharma-login')}>
                        Pharmacist
                    </Button>
                    <Button handleClick={() => changeRoute('/')}>
                        Customer
                    </Button>
                </div>
            </AuthenticationTemplate>
        </div>
    );
};

export default RoleModal;
