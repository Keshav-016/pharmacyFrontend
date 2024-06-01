import { useEffect, useState } from 'react';
import GlobalInput from './GlobalInput';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserByToken,
    setUser,
    updateUserDetails
} from '../features/userSlice';

const UserProfileComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [newName, setNewName] = useState(() => user?.data?.name);
    const [newPhone, setNewPhone] = useState(user?.data?.phone);
    const [newDob, setNewDob] = useState(user?.data?.dob?.slice(0, 10));

    const changeName = (e) => {
        setNewName(e.target.value);
    };

    const changePhone = (e) => {
        setNewPhone(e.target.value);
    };

    const changeAddresss = (e) => {
        setNewDob(e.target.value);
    };

    useEffect(() => {
        setNewName(user?.data?.name);
        setNewPhone(user?.data?.phone);
        setNewDob(user?.data?.dob);
    }, [user]);

    const handleSaveDetails = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails({ newName, newPhone, newDob }));
    };

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 h-[100%]">
                <h1 className="text-3xl font-default-font-family text-semibold">
                    Profile
                </h1>
                <GlobalInput
                    inputLabel="Full Name"
                    value={newName}
                    handleChange={changeName}
                    placeholder="Name"
                />
                <div className="flex flex-col gap-1">
                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                        Email Address
                    </p>
                    <input
                        readOnly
                        value={user.data?.email}
                        className=" bg-[#f5f5f5] placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    />
                </div>
                <GlobalInput
                    inputLabel="Phone No"
                    value={newPhone}
                    handleChange={changePhone}
                />
                <GlobalInput
                    inputLabel="Birth Date(yyyy-mm-dd)"
                    value={newDob}
                    handleChange={changeAddresss}
                />
                <div className="lg:w-[30%] md:w-[50%] sm:w-[50%] flex justify-end py-10 ">
                    <Button handleClick={handleSaveDetails}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UserProfileComponent;
