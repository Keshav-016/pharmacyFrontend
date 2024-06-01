import { IoMdLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProileImage } from '../features/userSlice';
import handleConfirmAlert from '../utils/ConfirmTemplate';
import { useState } from 'react';
import { notify } from '../App';

const UserProfileSideBar = () => {
    const [currPage, setCurrPage] = useState(window.location.pathname);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        navigate(selectedValue);
    };

    const updateImage = (e) => {
        const formData = new FormData();
        formData.append('profile', e.target.files[0]);
        dispatch(updateUserProileImage(formData));
    };

    const setHandleLogouts = () => {
        localStorage.removeItem('token');
        navigate('/login');
        notify('You have been logged out ');
    };

    const handleLogout = () => {
        handleConfirmAlert(
            '',
            'medigen',
            'Are you sure you want to logout?',
            'Yes',
            setHandleLogouts
        );
    };

    const profileSettings = [
        {
            name: 'Edit Profile',
            route: '/user-profile'
        },
        {
            name: 'Manage Address',
            route: '/user-profile/address'
        }
    ];

    const ordersSettings = [
        {
            name: 'My Orders',
            route: '/user-profile/order'
        }
    ];

    const handleRoutes = (item) => {
        setCurrPage(item);
        navigate(item);
    };

    return (
        <>
            <div className="flex gap-10 flex-col justify-center p-3   ">
                <div className="flex gap-1 lg:justify-center justify-between items-center pe-3">
                    <div className="flex lg:flex-row flex-col">
                        <div>
                            <img
                                className="bg-[#f5f5f5] w-[100px] h-[100px]  rounded-[50%]"
                                src={`http://localhost:3003/images/${user?.data?.image}`}
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
                        <form>
                            <select
                                id="countries"
                                className=" text-sm rounded-lg p-2.5 font-default-font-family w-[110px]"
                                onChange={handleChange}
                            >
                                <option value="/user-profile">
                                    Edit Profie
                                </option>
                                <option value="/user-profile/address">
                                    Manage Address
                                </option>
                                <option value="/user-profile/order">
                                    My Orders
                                </option>
                            </select>
                        </form>
                    </div>
                </div>

                <div className="lg:flex hidden flex-col gap-40 justify-between">
                    <div className="lg:flex flex-col font-default-font-family gap-2 ">
                        <h1 className="text-[1.2rem] font-medium">
                            Profile Settings
                        </h1>

                        <div className="flex flex-col justify-between gap-5">
                            <div className="flex flex-col">
                                {profileSettings.map((item) => (
                                    <h2
                                        key={item.name}
                                        onClick={() => {
                                            handleRoutes(item.route);
                                        }}
                                        className={`${currPage === item.route ? 'text-[0.9rem] text-blue-700 font-medium hover:cursor-pointer' : 'text-[0.9rem] text-grey font-medium hover:cursor-pointer'}`}
                                    >
                                        {item.name}
                                    </h2>
                                ))}
                            </div>

                            <div className="flex flex-col font-default-font-family gap-2">
                                <h1 className="text-[1.2rem] font-medium">
                                    Orders
                                </h1>
                                <div className="flex flex-col">
                                    {ordersSettings.map((item) => (
                                        <h2
                                            key={item.name}
                                            onClick={() => {
                                                handleRoutes(item.route);
                                            }}
                                            className={`${currPage === item.route ? 'text-[0.9rem] text-blue-700 font-medium hover:cursor-pointer' : 'text-[0.9rem] text-grey font-medium hover:cursor-pointer'}`}
                                        >
                                            {item.name}
                                        </h2>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className=" lg:flex gap-1 justify-start items-center  font-default-font-family mt-20 hover:cursor-pointer">
                            <span>
                                <IoMdLogOut
                                    style={{
                                        fontSize: '1.3rem',
                                        rotate: '-90deg'
                                    }}
                                />
                            </span>
                            <span
                                className=" cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileSideBar;
