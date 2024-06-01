import React from 'react';
import AdminNav from './AdminNav';
import { Outlet } from 'react-router-dom';

const Admin = () => {
    return (
        <div>
            <AdminNav />
            <Outlet />
        </div>
    );
};

export default Admin;
