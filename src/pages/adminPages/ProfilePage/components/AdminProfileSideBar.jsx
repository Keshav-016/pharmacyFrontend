import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminImage } from '../../../../features/adminDetailsSlice';
import { checkProfilePictureType } from '../../../../validators/validatZod';
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
    const [profileImg, setProfileImg] = useState(null);
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
                localStorage.removeItem('adminToken');
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
            const adminToken = localStorage.getItem('adminToken');
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

    const updateImage = (e) => {
        const formData = new FormData();
        formData.append('profile', e.target.files[0]);
        const resFile = checkProfilePictureType.safeParse({ profImg: e.target.files[0] });
        if (!resFile.success) { notify('Only .jpg, .png and .jpeg format are suppoted!'); return; }
        setProfileImg(e.target.files[0]);
    };

    const handleUploadImage = (e) => {
        const formData = new FormData();
        formData.append('profile', profileImg);
        dispatch(updateAdminImage(formData));
    }

    return (
        <>
            <div className="flex gap-10 flex-col justify-center p-3   ">
                <div className=' flex justify-between flex-col gap-3'>
                    <div className="flex gap-1 justify-between items-center">
                        <div className="flex xs:flex-row flex-col gap-1 lg:justify-between  xl:w-[100%] ">
                             <img
                                className="bg-[#e4e4e4] xxl:w-[150px] xxl:h-[150px] w-[100px] h-[100px] rounded-[50%]  object-contain"
                                src={profileImg !== null ? URL.createObjectURL(profileImg) : `http://localhost:3003/images/${adminData?.image}`}
                                alt="userImage"
                            />

                            <div className="flex justify-center items-center flex-col gap-2 pt-2 sm:pt-0 sm:ps-2 xl:ps-0">
                                <span className=" font-default-font-family text-[0.6rem] text-center text-[#737A83] ">
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
                    <button onClick={handleUploadImage} className=' lg:block hidden bg-[#fff] text-[#1444ef] border border-[#1444ef] text-[0.8rem] py-1 rounded-md mb-50 '> upload profile photo</button>
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
                                    className={`${currPage === item.route ? 'text-[0.9rem] text-blue-700 font-medium ' : 'text-[0.9rem] text-[#737A83] font-medium'}`}
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
                <button onClick={handleUploadImage} className=' lg:hidden block bg-[#fff] text-[#1444ef] border border-[#1444ef] text-[0.8rem] py-1 rounded-md mb-50 '> upload profile photo</button>
            </div >
        </>
    );
};

export default AdminProfileSideBar;
