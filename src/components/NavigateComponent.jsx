import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateComponent = ({ route, isRouting }) => {
    const navigate = useNavigate();
    const [open, isOpen] = useState(false);

    const navigateFunction = () => {
        navigate(route);
    };

    const setNavigation = () => {
        isOpen(isRouting);
    };

    return (
        <div>
            {setNavigation()};{open ? navigateFunction() : ''}
        </div>
    );
};

export default NavigateComponent;
