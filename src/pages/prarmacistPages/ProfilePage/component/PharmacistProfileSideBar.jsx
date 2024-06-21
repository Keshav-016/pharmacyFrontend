import { IoMdLogOut } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    logOut,
    updatePharmacistImage
} from '../../../../features/pharmacistDetailsSlice';
import handleConfirmAlert from '../../../../utils/ConfirmTemplate';
import { checkProfilePictureType } from '../../../../validators/validatZod';
import { notify } from '../../../../App';

const PharmacistProfileSideBar = () => {
    const pharmacist = useSelector((state) => state.pharmacist.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState(null);

    const handleLogout = () => {
        handleConfirmAlert(
            'question',
            'Are you Sure You want to Logout!',
            '',
            'Logout',
            () =>
                dispatch(logOut({ redirect: () => navigate('/pharma-login') }))
        );
    };

    const handleUploadImage = () => {
        const formData = new FormData();
        formData.append('profile', profileImg);
        dispatch(updatePharmacistImage(formData));
    }

    const updateImage = (e) => {
        const formData = new FormData();
        formData.append('profile', e.target.files[0]);
        const resFile = checkProfilePictureType.safeParse({ profImg: e.target.files[0] });
        if(!resFile.success) { notify('Only .jpg, .png and .jpeg format are suppoted!'); return; }
        setProfileImg(e.target.files[0]);
    };
    return (
        <>
            <div className="flex gap-10 lg:flex-col justify-between p-3   ">
            <div className=' flex justify-between flex-col gap-3'>
                <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-1 gap-2">
                    <img
                        className="bg-[#e4e4e4] xxl:w-[150px] xxl:h-[150px] w-[100px] h-[100px] rounded-[50%]  object-contain"
                        src={profileImg !== null ? URL.createObjectURL(profileImg) : `http://localhost:3003/images/${pharmacist?.image}`}
                        alt="userImage"
                    />
                    <div className="flex justify-center items-center flex-col gap-2">
                        <span className=" font-default-font-family text-[0.6rem] text-center ext-gray-600  ">
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
                            onChange={updateImage}
                        />
                    </div>
                </div>
                <button onClick={handleUploadImage} className=' bg-[#fff] text-[#1444ef] border border-[#1444ef] text-[0.8rem] py-1 rounded-md mb-50 '> upload profile photo</button>
                </div>

                <div className="lg:flex flex-col gap-40 justify-between my-auto">
                    <div className="flex flex-col font-default-font-family gap-2 ">
                        <h1 className="text-[1.1rem] font-medium hidden lg:block">
                            Profile Settings
                        </h1>
                        <Link to="/pharmacist/profile">
                            <h2 className=" text-button text-[0.8rem]">
                                Edit profile
                            </h2>
                        </Link>
                    </div>

                    <div
                        className="hidden lg:flex gap-1 justify-start items-center  font-default-font-family cursor-pointer"
                        onClick={handleLogout}
                    >
                        <span>
                            <IoMdLogOut
                                style={{ fontSize: '1.3rem', rotate: '-90deg' }}
                            />
                        </span>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PharmacistProfileSideBar;
