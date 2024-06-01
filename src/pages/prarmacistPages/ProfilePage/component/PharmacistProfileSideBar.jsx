import { IoMdLogOut } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    logOut,
    updatePharmacistImage
} from '../../../../features/pharmacistDetailsSlice';
import handleConfirmAlert from '../../../../utils/ConfirmTemplate';

const PharmacistProfileSideBar = () => {
    const pharmacist = useSelector((state) => state.pharmacist.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const updateImage = (e) => {
        const formData = new FormData();
        formData.append('profile', e.target.files[0]);
        dispatch(updatePharmacistImage(formData));
    };
    return (
        <>
            <div className="flex gap-10 lg:flex-col justify-between p-3   ">
                <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-1 gap-2">
                    <img
                        src={`http://localhost:3003/images/${pharmacist?.image}`}
                        alt="pharmacist Image"
                        className="bg-[#f5f5f5] w-[80px] h-[80px]  rounded-[50%]"
                    />
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
                            onChange={updateImage}
                        />
                    </div>
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
