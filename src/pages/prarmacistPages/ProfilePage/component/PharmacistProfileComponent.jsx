import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import GlobalInput from '../../../../components/GlobalInput';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePharmacistDetails } from '../../../../features/pharmacistDetailsSlice';
import { checkName, checkPhoneNumber } from '../../../../validators/validatZod';

const PharmacistProfileComponent = () => {
    const dispatch = useDispatch();
    const nameRef = useRef();
    const phoneRef = useRef();
    const pharmacist = useSelector((state) => state.pharmacist.data);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [errorName, setErrorName] = useState(null);
    const [errorPhone, setErrorPhone] = useState(null);

    useEffect(() => {
        setName(pharmacist?.name);
        setPhone(pharmacist?.pharmacyId?.phone);
    }, [pharmacist]);

    const updateDetails = async (e) => {
        e.preventDefault();
        const obj = {
            name: nameRef.current.value,
            phone: phoneRef.current.value
        };
        dispatch(updatePharmacistDetails(obj));
    };
    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4 h-[100%]">
                <h2 className="text-[1.2rem] font-medium">Profile</h2>

                <form className="mt-4">
                    <div className="flex flex-col gap-1 py-2">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Registered Pharmacy Name
                        </p>
                        <input
                            readOnly
                            placeholder={'Holy Cross Pharmacy'}
                            type={'text'}
                            value={pharmacist?.pharmacyName}
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md bg-[#f5f5f5] text-[grey]"
                        />
                    </div>

                    <div className="flex flex-col gap-1 py-2 h-[5rem]">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Pharmacist Name <sup>*</sup>
                        </p>
                        <input
                            value={name}
                            type="text"
                            placeholder="Jhon Doe"
                            ref={nameRef}
                            onChange={() => {
                                const resName = checkName.safeParse({
                                    name: nameRef.current.value
                                });
                                resName.success
                                    ? setErrorName('')
                                    : setErrorName(
                                          resName.error.issues.map(
                                              (err) => err.message
                                          )
                                      );
                                setName(nameRef.current.value);
                            }}
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                        />
                        {errorName !== '' ? (
                            <span className=" text-red ms-auto text-[0.65rem]">
                                <span className=" flex justify-center items-center gap-[2px]">
                                    {errorName}
                                </span>
                            </span>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className="flex flex-col gap-1 py-2">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Registration No
                        </p>
                        <input
                            readOnly
                            placeholder={'PK012312453'}
                            type={'text'}
                            value={pharmacist?.registrationNo}
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md bg-[#f5f5f5] text-[grey]"
                        />
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Email Address
                        </p>
                        <input
                            readOnly
                            type={'email'}
                            placeholder={'edwardcross@infomail.com'}
                            value={pharmacist?.email}
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md bg-[#f5f5f5] text-[grey]"
                        />
                    </div>

                    <div className="flex flex-col gap-1 py-2 h-[5rem] mb-3">
                        <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                            Mobile Number<sup>*</sup>
                        </p>
                        <input
                            value={phone}
                            type="number"
                            placeholder="1234567890"
                            ref={phoneRef}
                            onChange={() => {
                                const resPhone = checkPhoneNumber.safeParse({
                                    phone: phoneRef.current.value
                                });
                                resPhone.success
                                    ? setErrorPhone('')
                                    : setErrorPhone(
                                          resPhone.error.issues.map(
                                              (err) => err.message
                                          )
                                      );
                                setPhone(phoneRef.current.value);
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

                    <div className="flex flex-col gap-1 py-2">
                        <div className="flex justify-between">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Password
                            </p>
                            <Link to="change-password">
                                <span className="font-default-font-family text-violet-700 cursor-pointer text-[0.8rem]">
                                    change Password
                                </span>
                            </Link>
                        </div>
                        <input
                            readOnly
                            type={'Password'}
                            value={'xxxxxxxxxxxx'}
                            className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md bg-[#f5f5f5] text-[grey] "
                        />
                    </div>

                    <div className="w-[30%] ms-auto mt-10">
                        <Button handleClick={updateDetails}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PharmacistProfileComponent;
