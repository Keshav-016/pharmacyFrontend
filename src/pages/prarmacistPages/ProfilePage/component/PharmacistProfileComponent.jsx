import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import GlobalInput from '../../../../components/GlobalInput';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { updatePharmacistDetails } from '../../../../features/pharmacistDetailsSlice';
import showAlert from '../../../../components/showAlert';
const PharmacistProfileComponent = () => {
    const dispatch = useDispatch();
    const pharmacistName = useRef();
    const phone = useRef();
    const pharmacist = useSelector((state) => state.pharmacist.data);

    console.log(pharmacist);

    const updateDetails = async (e) => {
        e.preventDefault();
        const obj = {
            name: pharmacistName.current.value,
            phone: phone.current.value
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
                    <GlobalInput
                        inputLabel={'Pharmacist Name'}
                        placeholder={'Edward Cross'}
                        type={'text'}
                        value={pharmacist?.name}
                        refValue={pharmacistName}
                    />
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
                    <GlobalInput
                        inputLabel={'Phone Number'}
                        type={'number'}
                        placeholder={'+91 1234567890'}
                        value={pharmacist?.phone}
                        refValue={phone}
                    />
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
