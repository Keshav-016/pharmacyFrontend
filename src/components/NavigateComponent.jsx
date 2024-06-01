import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateComponent = ({ route, isRouting }) => {
    const navigate = useNavigate();
    const [open, isOpen] = useState(false);

    const navigateFunction = () => {
        console.log(2);
        navigate(route);
    };

    const setNavigation = () => {
        console.log(1);
        isOpen(isRouting);
    };

    return (
        <div>
            {setNavigation()};{open ? navigateFunction() : ''}
        </div>
    );
};

export default NavigateComponent;
