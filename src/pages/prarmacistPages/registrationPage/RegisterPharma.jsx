import AddressForm from './components/AddressForm';
import Map from './components/Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useRef } from 'react';
import AuthenticationTemplate from '../../../components/AuthenticationTemplate';
import Button from '../../../components/Button';
import GenericModal from '../../../components/GenericModal';
import { MdOutlineAdd } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { notify } from '../../../App';
import ImageModal from '../../../components/ImageModal';
import axios from 'axios';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import {
    checkName,
    checkEmail,
    checkPhoneNumber,
    checkPassword,
    checkPharmacyRegNumber,
    checkFileType
} from '../../../validators/validatZod';
import showAlert from '../../../components/showAlert';
import { useNavigate } from 'react-router-dom';

function RegisterPharma() {
    const [showModel, setShowModal] = useState(false);
    const nameRef = useRef();
    const [name, setName] = useState('');
    const pharmaNameRef = useRef();
    const [pharmaName, setPharmaName] = useState('');
    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const phoneRef = useRef();
    const [phone, setPhone] = useState('');
    const passRef = useRef();
    const [pass, setPass] = useState('');
    const regNoRef = useRef();
    const [regNo, setRegNo] = useState('');
    const confirmPassRef = useRef();
    const [confirmPass, setConfirmPass] = useState('');
    const [page, setPage] = useState(1);
    const [address, setAddress] = useState({
        streetAndNumber: '',
        place: '',
        region: '',
        postcode: '',
        country: '',
        latitude: '',
        longitude: ''
    });
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [errorName, setErrorName] = useState(null);
    const [errorMail, setErrorMail] = useState(null);
    const [errorPhone, setErrorPhone] = useState(null);
    const [errorPharmaName, setErrorPharmaName] = useState(null);
    const [errorPass, setErrorPass] = useState(null);
    const [errroConfirmPass, setErrorConfirmPass] = useState(null);
    const [erroRegNo, setErrorRegNo] = useState(null);
    const [errorFile, setErrorFile] = useState(null);
    const navigate = useNavigate();

    const updateCoordinates = (latitude, longitude) => {
        setAddress({ ...address, latitude, longitude });
    };

    const handlePrescriptionUpload = (e) => {
        if (files.length >= 2)
            notify('You cannot upload more then 2 prescription');
        else {
            setFiles([...files, URL.createObjectURL(e.target.files[0])]);
            setCertificate([...certificate, e.target.files[0]]);
            setFile([...file, e.target.files[0].name]);
        }
        const resFile = checkFileType.safeParse({ fileX: e.target.files[0] });
        resFile.success
            ? setErrorFile('')
            : setErrorFile(resFile.error.issues.map((err) => err.message));
    };

    const handleItemDelete = (index, item) => {
        setFiles(files.filter((ele, i) => i !== index));
        setCertificate(certificate.filter((ele, i) => i !== index));
        setFile(file.filter((ele) => ele !== item));
    };

    const handleRegistration = async () => {
        const formData = new FormData();
        for (let i = 0; i < certificate.length; i++) {
            formData.append('certificates', certificate[i]);
        }
        formData.append('pharmacyName', pharmaName);
        formData.append('registration_no', regNo);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', pass);
        formData.append('building', address.streetAndNumber);
        formData.append('area', address.place);
        formData.append('landmark', address.region);
        formData.append('pin', address.postcode);
        formData.append('longitude', address.longitude);
        formData.append('latitude', address.latitude);
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3003/pharmacist/register',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
            showAlert('success', 'You have been registered successfully!');
            navigate('/pharma-login');
        } catch (error) {
            console.log(error);
            notify(error.response.data.message);
        }
    };

    const [eye, setEye] = useState(false);
    const [type, setType] = useState('password');
    const handleEye = () => {
        if (!eye) {
            setType('text');
            setEye(true);
        } else {
            setType('password');
            setEye(false);
        }
    };
    const [eyePass, setEyePass] = useState(false);
    const [typePass, setTypePass] = useState('password');
    const handleEyePass = () => {
        if (!eyePass) {
            setTypePass('text');
            setEyePass(true);
        } else {
            setTypePass('password');
            setEyePass(false);
        }
    };

    return (
        <>
            <AuthenticationTemplate SubHeading={'Registration Form'}>
                <div className=" border bg-[#f5f5f5]  w-[100%]  relative">
                    <span className=" w-[3px] h-[14px]  bg-white text-[0.6rem] flex justify-center items-center  absolute start-[-2px]  top-[-3px]"></span>
                    <span className=" w-[3px] h-[14px]  bg-white text-[0.6rem] flex justify-center items-center  absolute start-[20%]  top-[-3px]"></span>
                    <span className=" w-[3px] h-[14px]  bg-white text-[0.6rem] flex justify-center items-center  absolute start-[40%]  top-[-3px]"></span>
                    <span className=" w-[3px] h-[14px]  bg-white text-[0.6rem] flex justify-center items-center  absolute start-[60%]  top-[-3px]"></span>
                    <span className=" w-[3px] h-[14px]  bg-white text-[0.6rem] flex justify-center items-center  absolute start-[80%]  top-[-3px]"></span>
                    <span className=" w-[3px] h-[14px]  bg-white text-[0.6rem] flex justify-center items-center  absolute start-[100%]  top-[-3px]"></span>
                    <div
                        className={`bg-[#1444ef] h-2 ${page === 1 ? 'w-[20%]' : page === 2 ? 'w-[40%]' : page === 3 ? 'w-[60%]' : page === 4 ? 'w-[80%]' : 'w-[100%]'}`}
                    ></div>
                </div>
                {page === 1 && (
                    <>
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

                        <div className="flex flex-col gap-1 py-2 h-[5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Email ID <sup>*</sup>
                            </p>
                            <input
                                value={email}
                                type="text"
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

                        <div className="mt-5 w-[50%] ms-auto">
                            <Button
                                handleClick={() => {
                                    if (
                                        errorName === null &&
                                        errorMail === null
                                    ) {
                                        setErrorName('Feild requied');
                                        setErrorMail('Feild requied');
                                    }
                                    if (errorName === '' && errorMail === '')
                                        setPage(2);
                                }}
                            >
                                {' '}
                                Next
                            </Button>
                        </div>
                    </>
                )}
                {page === 2 && (
                    <>
                        <div className="flex flex-col gap-1 py-2 h-[5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Mobile Number<sup>*</sup>
                            </p>
                            <input
                                value={phone}
                                type="tel"
                                placeholder="1234567890"
                                ref={phoneRef}
                                onChange={() => {
                                    const resPhone = checkPhoneNumber.safeParse(
                                        { phone: phoneRef.current.value }
                                    );
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

                        <div className="flex flex-col gap-1 py-2 h-[5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Pharmacy Name<sup>*</sup>
                            </p>
                            <input
                                value={pharmaName}
                                type="text"
                                placeholder="ABC pharmaceutical"
                                ref={pharmaNameRef}
                                onChange={() => {
                                    const resPharmaName = checkName.safeParse({
                                        name: pharmaNameRef.current.value
                                    });
                                    resPharmaName.success
                                        ? setErrorPharmaName('')
                                        : setErrorPharmaName(
                                              resPharmaName.error.issues.map(
                                                  (err) => err.message
                                              )
                                          );
                                    setPharmaName(pharmaNameRef.current.value);
                                }}
                                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                            />
                            {errorPharmaName !== '' ? (
                                <span className=" text-red ms-auto text-[0.65rem]">
                                    {errorPharmaName}
                                </span>
                            ) : (
                                <span>{''}</span>
                            )}
                        </div>

                        <div className="mt-5 flex gap-3">
                            <Button handleClick={() => setPage(1)}>
                                {' '}
                                Previous
                            </Button>
                            <Button
                                handleClick={() => {
                                    if (
                                        errorPhone === null &&
                                        errorPharmaName === null
                                    ) {
                                        setErrorPhone('Feild requied');
                                        setErrorPharmaName('Feild requied');
                                    }
                                    if (
                                        errorPhone === '' &&
                                        errorPharmaName === ''
                                    )
                                        setPage(3);
                                }}
                            >
                                {' '}
                                Next
                            </Button>
                        </div>
                    </>
                )}
                {page === 3 && (
                    <>
                        <div className="flex flex-col gap-1 py-2 h-[5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Password<sup>*</sup>
                            </p>
                            <div className=" flex  justify-between outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md">
                                <input
                                    value={pass}
                                    type={type}
                                    placeholder="m#P52s@ap$V"
                                    ref={passRef}
                                    onChange={() => {
                                        const resPassword =
                                            checkPassword.safeParse({
                                                password: passRef.current.value
                                            });
                                        resPassword.success
                                            ? setErrorPass('')
                                            : setErrorPass(
                                                  resPassword.error.issues.map(
                                                      (err) => err.message
                                                  )
                                              );
                                        setPass(passRef.current.value);
                                    }}
                                    className=" outline-none font-default-font-family w-[100%] "
                                />
                                {eye ? (
                                    <FaRegEye
                                        onClick={handleEye}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        onClick={handleEye}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </div>
                            {errorPass !== '' ? (
                                <span className=" text-red ms-auto text-[0.65rem]">
                                    {errorPass}
                                </span>
                            ) : (
                                <span>{''}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 py-2 h-[5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Confirm Password<sup>*</sup>
                            </p>
                            <div className=" flex  justify-between outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md">
                                <input
                                    value={confirmPass}
                                    type={typePass}
                                    placeholder="m#P52s@ap$V"
                                    ref={confirmPassRef}
                                    onChange={() => {
                                        const resConfirmPassword =
                                            checkPassword.safeParse({
                                                password:
                                                    confirmPassRef.current.value
                                            });
                                        resConfirmPassword.success
                                            ? setErrorConfirmPass('')
                                            : setErrorConfirmPass(
                                                  resConfirmPassword.error.issues.map(
                                                      (err) => err.message
                                                  )
                                              );
                                        setConfirmPass(
                                            confirmPassRef.current.value
                                        );
                                    }}
                                    className=" outline-none font-default-font-family  w-[100%]"
                                />
                                {eyePass ? (
                                    <FaRegEye
                                        onClick={handleEyePass}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        onClick={handleEyePass}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </div>
                            {errroConfirmPass !== '' ? (
                                <span className=" text-red ms-auto text-[0.65rem]">
                                    {errroConfirmPass}
                                </span>
                            ) : (
                                <span>{''}</span>
                            )}
                        </div>

                        <div className="mt-5 flex gap-3">
                            <Button
                                handleClick={() => {
                                    setPage(2);
                                }}
                            >
                                {' '}
                                Previous
                            </Button>
                            <Button
                                handleClick={() => {
                                    if (
                                        errorPass === null &&
                                        errroConfirmPass === null
                                    ) {
                                        setErrorPass('Feild requied');
                                        setErrorConfirmPass('Feild requied');
                                    }
                                    if (pass !== confirmPass) {
                                        setErrorConfirmPass(
                                            'Password doesnt match'
                                        );
                                        return;
                                    }
                                    if (
                                        errorPass === '' &&
                                        errroConfirmPass === ''
                                    )
                                        setPage(4);
                                }}
                            >
                                {' '}
                                Next
                            </Button>
                        </div>
                    </>
                )}
                {page === 4 && (
                    <>
                        <div className="flex flex-col gap-1 py-2 h-[5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Licence No./Registraion no. <sup>*</sup>
                            </p>
                            <input
                                value={regNo}
                                type="text"
                                placeholder="1234567890123456"
                                ref={regNoRef}
                                onChange={() => {
                                    const resRego =
                                        checkPharmacyRegNumber.safeParse({
                                            pharmacyRegNumber:
                                                regNoRef.current.value
                                        });
                                    resRego.success
                                        ? setErrorRegNo('')
                                        : setErrorRegNo(
                                              resRego.error.issues.map(
                                                  (err) => err.message
                                              )
                                          );
                                    setRegNo(regNoRef.current.value);
                                }}
                                className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                            />
                            {erroRegNo !== '' ? (
                                <span className=" text-red ms-auto text-[0.65rem]">
                                    <span className=" flex justify-center items-center gap-[2px]">
                                        {erroRegNo}
                                    </span>
                                </span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className=" h-[6.5rem]">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem] ">
                                Upload Certificates
                            </p>

                            <div className=" flex justify-between h-[5rem] gap-8">
                                <label
                                    htmlFor="files"
                                    className="h-[40px] w-[40px] bg-[#D2D8EF] rounded-md flex justify-center items-center cursor-pointer"
                                >
                                    <MdOutlineAdd size={10} />
                                </label>

                                <input
                                    type="file"
                                    id="files"
                                    className=" hidden my-5 rounded-md p-1 text-center text-[0.7rem]"
                                    onChange={(e) => {
                                        handlePrescriptionUpload(e);
                                    }}
                                />
                                <div className=" flex flex-col h-[5rem]">
                                    {file.length > 0 &&
                                        file?.map((item, index) => (
                                            <div
                                                key={index}
                                                className=" my-1 bg-[#f5f5f5] j justify-between gap-10 items-center flex p-1 rounded-md "
                                            >
                                                <span
                                                    onClick={() => {
                                                        setModalImage(
                                                            `${files[index]}`
                                                        );
                                                        setOpenModal(true);
                                                    }}
                                                    className=" text-[#1444ef] text-[0.8rem]"
                                                >
                                                    {item}
                                                </span>
                                                <button
                                                    type="button"
                                                    className=" bg-[#696969] h-[20px] w-[20px] p-1 flex  items-center rounded-[50%] "
                                                    onClick={() => {
                                                        handleItemDelete(
                                                            index,
                                                            item
                                                        );
                                                    }}
                                                >
                                                    <IoClose color="white" />
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {errorFile !== '' ? (
                                <span className=" text-red flex justify-end text-[0.65rem]">
                                    <span className=" flex justify-center items-center gap-[2px]">
                                        {errorFile}
                                    </span>
                                </span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="mt-5 flex gap-3">
                            <Button handleClick={() => setPage(3)}>
                                {' '}
                                Previous
                            </Button>
                            <Button
                                handleClick={() => {
                                    if (
                                        erroRegNo === '' &&
                                        errorFile === '' &&
                                        certificate.length === 2
                                    )
                                        setPage(5);
                                    else setErrorFile('2 certificates requied');
                                
                                }}
                            >
                                {' '}
                                Next
                            </Button>
                        </div>
                    </>
                )}
                {page === 5 && (
                    <>
                        <div className="flex flex-col gap-1 py-2">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Address
                            </p>

                            <input
                                onClick={() => {
                                    setShowModal(true);
                                }}
                                readOnly
                                value={` ${address.streetAndNumber} ${address.place}  ${address.region}  ${address.country}  ${address.postcode}  `}
                                placeholder="address"
                                className=" bg-[#f5f5f5] outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                            />
                        </div>

                        <div className="mt-5 flex gap-3">
                            <Button handleClick={() => setPage(4)}>
                                {' '}
                                Previous
                            </Button>
                            <button
                                onClick={handleRegistration}
                                type="submit"
                                className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.6rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-lg rounded-md lg:text-normal text-[0.8rem] "
                            >
                                {' '}
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </AuthenticationTemplate>
            {showModel && (
                <GenericModal
                    onClose={() => setShowModal(false)}
                    heading={`Address`}
                >
                    <div className=" grid grid-cols-12 gap-3 md:gap-8 my-5 justify-center items-center">
                        <div className=" col-span-12 md:col-span-6">
                            <AddressForm
                                setShowModal={setShowModal}
                                address={address}
                                setAddress={setAddress}
                            />
                        </div>
                        {address.longitude && address.latitude ? (
                            <div className=" md:col-span-6">
                                <Map
                                    longitude={address.longitude}
                                    latitude={address.latitude}
                                    updateCoordinates={updateCoordinates}
                                />
                            </div>
                        ) : (
                            <div className=" md:col-span-6 text-[1.5rem] text-[#969595] flex items-center justify-center w-[235px] sm:w-[350px] md:w-[350px] md:h-[350px]  h-[200px] bg-[#e1e1e1] ">
                                Type address to see map!
                            </div>
                        )}
                    </div>
                </GenericModal>
            )}
            <ImageModal
                open={openModal}
                setOpen={setOpenModal}
                image={modalImage}
            />
        </>
    );
}

export default RegisterPharma;
