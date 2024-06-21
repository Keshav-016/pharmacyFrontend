import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminProfileSideBar from './components/AdminProfileSideBar';
import Footer from '../../../components/Footer';

const ProfilePage = () => {
    return (
        <>
            <div className="bg-[#EBF6F9] flex flex-col items-center justify-between min-h-[90vh] pt-5 ">
                <div className="   sm:w-[80%] w-[100%] grid grid-cols-12 mx-auto py-5  justify-start justify-items-start gap-5 lg:gap-0  m-width-[1200px]">
                    <div className="w-[100%] lg:col-span-4 xl:col-span-3 col-span-12  px-5 lg:px-10">
                        <div className="lg:w-[120%] bg-white lg:p-5 p-4  flex flex-col gap-3 rounded-lg">
                            <AdminProfileSideBar />
                        </div>
                    </div>
                    <div className="w-[100%] lg:col-span-8 xl:col-span-9 col-span-12 lg:px-10 px-5">
                        <Outlet />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
