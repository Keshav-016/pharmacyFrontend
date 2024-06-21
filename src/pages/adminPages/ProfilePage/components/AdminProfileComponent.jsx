import Button from '../../../../components/Button';
import { useEffect, useRef, useState } from 'react';
import { notify } from '../../../../App';
import {
    checkName,
    checkEmail,
    checkPhoneNumber
} from '../../../../validators/validatZod';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AdminProfileComponent = () => {
    const [adminUser, setadminUser] = useState([]);
    const [adminAddress, setAdminAddress] = useState('');
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState(null);
    const [email, setEmail] = useState('');
    const [errorMail, setErrorMail] = useState(null);
    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState(null);

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
            setadminUser(rawData.data.data);
            setEmail(rawData.data.data.email);
            setName(rawData.data.data.name);
            setPhone(rawData.data.data.phone);
            const address =
                rawData.data.data.address.building +
                ', ' +
                rawData.data.data.address.area +
                ', ' +
                rawData.data.data.address.landmark +
                ', ' +
                rawData.data.data.address.pin;
            setAdminAddress(address);
        } catch (err) {
            notify(err.response.data.message);
        }
    };

    const updateAdminDetails = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const rawData = await axios({
                method: 'put',
                url: 'http://localhost:3003/admin/update-details',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    name: name,
                    phone: phone
                }
            });
            setadminUser(rawData.data.data);
            rawData.data.message === 'success'
                ? notify('Details updated successfully', 'success')
                : notify('Unable to update details!');
        } catch (err) {
            notify(err.response.data.message);
        }
    };

    const handleAdminUpdate = (e) => {
        e.preventDefault();
        updateAdminDetails();
    };

    const setAdminPhone = () => {
        setPhone(phoneRef.current.value);
    };

    useEffect(() => {
        getAdminUser();
    }, []);

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4  h-[100%]">
                <h2 className="text-[1.5rem] font-default-font-family font-medium">
                    Profile
                </h2>
                <form className="mt-4">
                    {adminUser ? (
                        <>
                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <span className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Admin Name <sup>*</sup>
                                </span>
                                <input
                                    value={name}
                                    type="text"
                                    placeholder="Edward Cross"
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

                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Email Address <sup>*</sup>
                                </p>
                                <input
                                    value={email}
                                    type="email"
                                    placeholder="example@mail.com"
                                    ref={emailRef}
                                    onChange={() => {
                                        const resEmail = checkEmail.safeParse({
                                            email: emailRef.current.value
                                        });
                                        resEmail.success
                                            ? setErrorMail('')
                                            : setErrorMail(
                                                  resEmail.error.issues.map(
                                                      (err) => err.message
                                                  )
                                              );
                                        setEmail(emailRef.current.value);
                                    }}
                                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                                />
                                {errorMail !== '' ? (
                                    <span className=" text-red ms-auto text-[0.65rem]">
                                        {errorMail}
                                    </span>
                                ) : (
                                    <span>{''}</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 py-2 h-[5rem]">
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Phone Number<sup>*</sup>
                                </p>
                                <input
                                    value={phone}
                                    type="tel"
                                    placeholder="1234567890"
                                    ref={phoneRef}
                                    onChange={() => {
                                        const resPhone =
                                            checkPhoneNumber.safeParse({
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
                                <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                    Address
                                </p>
                                {adminAddress !== 'undefined' ? (
                                    <input
                                        type="text"
                                        placeholder="Webel STP 2 Building, DN-53, Salt Lake, Sec 5, Kolkata 700091"
                                        className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md bg-[#f5f5f5] text-[grey]"
                                        value={adminAddress}
                                        readOnly
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="w-[50%] sm:w-[30%] ms-auto mt-10">
                                <Button
                                    type="button"
                                    handleClick={(e) => {
                                        if (
                                            errorName == '' ||
                                            (errorName === null &&
                                                errorMail === '') ||
                                            (errorMail === null &&
                                                errorPhone === '') ||
                                            errorPhone === null
                                        )
                                            handleAdminUpdate(e);
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                </form>
            </div>
        </>
    );
};

export default AdminProfileComponent;
