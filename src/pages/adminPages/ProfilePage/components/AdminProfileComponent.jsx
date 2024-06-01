import Button from '../../../../components/Button';
import GlobalInput from '../../../../components/GlobalInput';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AdminProfileComponent = () => {
    const [adminUser, setadminUser] = useState([]);
    const [adminAddress, setAdminAddress] = useState('');
    const notify = (msg) => toast(msg);
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

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
            const adminToken = localStorage.getItem('token');
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
                ? notify('Details updated successfully')
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

    const setAdminName = () => {
        setName(nameRef.current.value);
    };

    const setAdminEmail = () => {
        setEmail(emailRef.current.value);
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
                <ToastContainer />
                <form className="mt-4">
                    {adminUser ? (
                        <>
                            <GlobalInput
                                inputLabel={'UserName'}
                                placeholder={'Edward Cross'}
                                type={'text'}
                                value={adminUser.name}
                                refValue={nameRef}
                                handleChange={setAdminName}
                            />
                            <GlobalInput
                                inputLabel={'Email Address'}
                                type={'email'}
                                placeholder={'edwardcross@infomail.com'}
                                value={adminUser.email}
                                refValue={emailRef}
                                handleChange={setAdminEmail}
                            />
                            <GlobalInput
                                inputLabel={'Phone Number'}
                                type={'number'}
                                placeholder={'+91 1234567890'}
                                value={adminUser.phone}
                                refValue={phoneRef}
                                handleChange={setAdminPhone}
                            />
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
                                    handleClick={(e) => handleAdminUpdate(e)}
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
