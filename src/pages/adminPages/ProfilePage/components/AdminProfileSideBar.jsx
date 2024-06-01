import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminImage } from '../../../../features/adminDetailsSlice';
import handleConfirmAlert from '../../../../utils/ConfirmTemplate';
import notify from '../../../../App';
import showAlert from '../../../../components/showAlert';

const AdminProfileSideBar = () => {
    const dropdownEle = [
        {
            heading: 'Profile Settings',
            name: 'Edit Profile',
            route: '/admin/admin-profile/edit'
        },
        {
            heading: 'Password',
            name: 'Reset Password',
            route: '/admin/admin-profile/password'
        }
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currPage, setCurrPage] = useState(window.location.pathname);
    const [adminProfile, setAdminProfile] = useState('');
    const adminData = useSelector((state) => state.admin.data);

    useEffect(() => {
        getAdminUser();
    }, [adminProfile]);

    const handleAdminLogout = () => {
        handleConfirmAlert(
            'question',
            '',
            'Are you sure you want to logout?',
            'Logout',
            () => {
                localStorage.removeItem('token');
                navigate('/admin-login');
                showAlert('Successfully logged out');
            }
        );
    };

    const handleAdminRoute = (item) => {
        setCurrPage(item.route);
        navigate(item.route);
    };

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        navigate(selectedValue);
    };

    const getAdminUser = async () => {
        try {
            const adminToken = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: 'http://localhost:3003/admin/details',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });
            setAdminProfile(rawData.data.data.image);
        } catch (err) {
            notify(err.response.data.message);
        }
    };

    const updateImage = async (e) => {
        const formData = new FormData();
        formData.append('profile', e.target.files[0]);
        dispatch(updateAdminImage(formData));
    };

    return (
        <>
            <div className="flex gap-10 flex-col justify-center p-3   ">
                <div className="flex gap-1 lg:justify-center justify-between items-center pe-3">
                    <div className="flex sm:flex-row flex-col sm:gap-4 lg:gap-1 gap-2">
                        <div className="bg-[#f5f5f5] rounded-[50%]">
                            <img
                                className="bg-[#f5f5f5] w-[100px] h-[100px]  rounded-[50%]"
                                src={`http://localhost:3003/images/${adminData?.image}`}
                                alt="userImage"
                            />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-2">
                            <span className=" font-default-font-family text-[0.6rem] text-center text-grey ">
                                Allowed file types:
                                <div className=" font-default-font-family text-black m-0 leading-3">
                                    png, jpg, jpeg
                                </div>
                            </span>
                            {/* <ToastContainer /> */}
                            <label
                                htmlFor="files"
                                className="text-[0.7rem] font-default-font-family text-[#1444ef] border-[0.02rem] border-[#1444ef] rounded-sm  px-2  cursor-pointer"
                            >
                                Browse
                            </label>
                            <input
                                type="file"
                                id="files"
                                className=" hidden my-5 rounded-md p-1 text-center text-[0.7rem]"
                                onChange={(e) => {
                                    updateImage(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className=" block lg:hidden">
                        <form className="">
                            <select
                                className=" text-sm rounded-lg p-2.5 font-default-font-family w-[110px]"
                                onChange={handleChange}
                            >
                                <option value="/admin/admin-profile/edit">
                                    Edit Profie
                                </option>
                                <option value="/admin/admin-profile/password">
                                    Reset Password
                                </option>
                            </select>
                        </form>
                    </div>
                </div>

                <div className="lg:flex hidden flex-col gap-40 justify-between">
                    <div className="lg:flex flex-col font-default-font-family gap-2 ">
                        {dropdownEle.map((item) => (
                            <div
                                key={item.name}
                                onClick={() => {
                                    handleAdminRoute(item);
                                }}
                                className="hover:cursor-pointer"
                            >
                                <h3 className="text-[16px] ">{item.heading}</h3>
                                <h3
                                    className={`${currPage === item.route ? 'text-[0.9rem] text-blue-700 font-medium ' : 'text-[0.9rem] text-grey font-medium'}`}
                                >
                                    {item.name}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <div
                        className=" lg:flex gap-1 justify-start items-center cursor-pointer  font-default-font-family "
                        onClick={handleAdminLogout}
                    >
                        <span>
                            <IoMdLogOut
                                style={{ fontSize: '1.2rem', rotate: '-90deg' }}
                            />
                        </span>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProfileSideBar;
