import { useEffect, useState } from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../features/userSlice';
import { notify } from '../App';
import { checkName, checkPhoneNumber } from '../validators/validatZod';

const UserProfileComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [newName, setNewName] = useState(user?.data?.name);
    const [errorName, setErrorName] = useState(null);
    const [newPhone, setNewPhone] = useState(user?.data?.phone);
    const [errorPhone, setErrorPhone] = useState(null);

    useEffect(() => {
        setNewName(user?.data?.name);
        setNewPhone(user?.data?.phone);
    }, [user]);

    const handleSaveDetails = (e) => {
        e.preventDefault();
        if (
            errorName == '' ||
            (errorName === null && errorPhone === '') ||
            errorPhone === null
        )
            dispatch(updateUserDetails({ newName, newPhone }));
    };

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 h-[100%]">
                <h1 className="text-3xl font-default-font-family text-semibold">
                    Profile
                </h1>

                <div className="flex flex-col gap-1 py-2 h-[5rem]">
                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                        Full Name <sup>*</sup>
                    </p>
                    <input
                        value={newName}
                        type="text"
                        placeholder="Jhon Doe"
                        onChange={(e) => {
                            const resName = checkName.safeParse({
                                name: e.target.value
                            });
                            resName.success
                                ? setErrorName('')
                                : setErrorName(
                                      resName.error.issues.map(
                                          (err) => err.message
                                      )
                                  );
                            setNewName(e.target.value);
                        }}
                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    />
                    {errorName !== '' && (
                        <span className=" text-red ms-auto text-[0.65rem]">
                            <span className=" flex justify-center items-center gap-[2px]">
                                {errorName}
                            </span>
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1 mt-[9px]">
                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                        Email Address
                    </p>
                    <input
                        onClick={() => {
                            notify('This feild cannot be edited!');
                        }}
                        readOnly
                        value={user.data?.email}
                        className=" bg-[#f5f5f5] placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1 py-2 h-[5rem]">
                    <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                        Phone Number<sup>*</sup>
                    </p>
                    <input
                        value={newPhone}
                        type="tel"
                        placeholder="1234567890"
                        onChange={(e) => {
                            const resPhone = checkPhoneNumber.safeParse({
                                phone: e.target.value
                            });
                            resPhone.success
                                ? setErrorPhone('')
                                : setErrorPhone(
                                      resPhone.error.issues.map(
                                          (err) => err.message
                                      )
                                  );
                            setNewPhone(e.target.value);
                        }}
                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    />
                    {errorPhone !== '' ? (
                        <span className=" text-red ms-auto text-[0.65rem]">
                            {errorPhone}
                        </span>
                    ) : (
                        <span>{''}</span>
                    )}
                </div>

                <div className="lg:w-[30%] md:w-[50%] sm:w-[50%] flex justify-end py-10 ms-auto ">
                    <Button handleClick={handleSaveDetails}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UserProfileComponent;
