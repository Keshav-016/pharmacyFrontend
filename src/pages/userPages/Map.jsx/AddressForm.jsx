import AutoCompleteInput from './AutoCompleteInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddressForm({
    address,
    setAddress,
    isEditable,
    id,
    userName,
    userPhone,
    userBuilding,
    setUserBuilding,
    setUserName,
    setUserPhone,
    type,
    handleHome,
    handleWork,
    handleOther,
    handleHotel
}) {
    const navigate = useNavigate();
    const handleManualInputChange = (event, stateProperty) => {
        const newAddress = { ...address };
        newAddress[stateProperty] = event.target.value;
        setAddress(newAddress);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (isEditable) {
            try {
                const token = localStorage.getItem('token');
                const rawData = await axios({
                    method: 'put',
                    url: `http://localhost:3003/user-address/update-address?id=${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        phone: userPhone,
                        receiverName: userName,
                        coordinates: [address.latitude, address.longitude],
                        address: {
                            building: userBuilding,
                            country: address.country,
                            city: address.place,
                            area: address.streetAndNumber,
                            state: address.region,
                            postcode: address.postcode
                        }
                    }
                });
                setAddress({
                    building: userBuilding,
                    country: rawData.data.data.address.country,
                    city: rawData.data.data.address.place,
                    area: rawData.data.data.address.streetAndNumber,
                    state: rawData.data.data.address.region,
                    postcode: rawData.data.data.address.postcode
                });
                console.log(rawData);
                if (rawData.data.message === 'success') {
                    navigate('/user-profile/address');
                }
            } catch (e) {
                console.log(e.response.data.message);
            }
        } else {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token exists');
                }
                const rawData = await axios({
                    method: 'post',
                    url: `http://localhost:3003/user-address/add-address`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        phone: userPhone,
                        receiverName: userName,
                        type: type,
                        coordinates: [address.latitude, address.longitude],
                        address: {
                            building: userBuilding,
                            country: address.country,
                            city: address.place,
                            area: address.streetAndNumber,
                            state: address.region,
                            postcode: address.postcode
                        }
                    }
                });
                console.log(rawData);
                if (rawData.data.message === 'success') {
                    navigate('/user-profile/address');
                }
            } catch (e) {
                console.log(e.response.data.message);
            }
        }
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setUserPhone(e.target.value);
    };

    const handleUserBuildingNameChange = (e) => {
        setUserBuilding(e.target.value);
    };

    console.log(type);

    return (
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            {isEditable ? (
                ''
            ) : (
                <div className=" flex justify-between p-5">
                    {type === 'home' ? (
                        <button
                            type="button"
                            className="border-[0.09rem] border-[#1444ef] px-2 py-1 rounded-md text-[#1444ef] text-[0.9rem]"
                        >
                            Home
                        </button>
                    ) : (
                        <button
                            onClick={() => handleHome()}
                            className=" border-[0.09rem] py-1 px-2 rounded-md text-grey text-[0.9rem]"
                            type="button"
                        >
                            Home
                        </button>
                    )}
                    {type === 'work' ? (
                        <button
                            type="button"
                            className="border-[0.09rem] border-[#1444ef] px-2 py-1 rounded-md text-[#1444ef] text-[0.9rem]"
                        >
                            Work
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => handleWork()}
                            className=" border-[0.09rem] py-1 px-2 rounded-md text-grey text-[0.9rem]"
                        >
                            Work
                        </button>
                    )}
                    {type === 'hotel' ? (
                        <button
                            type="button"
                            className="border-[0.09rem] border-[#1444ef] px-2 py-1 rounded-md text-[#1444ef] text-[0.9rem]"
                        >
                            Hotel
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                handleHotel();
                            }}
                            className=" border-[0.09rem] py-1 px-2 rounded-md text-grey text-[0.9rem]"
                        >
                            Hotel
                        </button>
                    )}
                    {type === 'other' ? (
                        <button
                            type="button"
                            className="border-[0.09rem] border-[#1444ef] px-2 py-1 rounded-md text-[#1444ef] text-[0.9rem]"
                        >
                            Other
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => handleOther()}
                            className=" border-[0.09rem] py-1 px-2 rounded-md text-grey text-[0.9rem]"
                        >
                            Other
                        </button>
                    )}
                </div>
            )}
            <div className=" grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-stretch sm:col-span-1 col-span-2">
                    <label
                        htmlFor="recieversName"
                        className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                    >
                        Recievers Name
                    </label>
                    <input
                        className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                        type="text"
                        placeholder="name"
                        value={userName}
                        onChange={handleUserNameChange}
                    />
                </div>

                <div className="flex flex-col justify-stretch sm:col-span-1 col-span-2">
                    <label
                        htmlFor="phoneno"
                        className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                    >
                        Phone Number
                    </label>
                    <input
                        className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                        type="text"
                        placeholder="phone"
                        onChange={handlePhoneChange}
                        value={userPhone}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-stretch">
                <label
                    htmlFor="building"
                    className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                >
                    House Number,Building Name
                </label>
                <input
                    className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                    type="text"
                    placeholder="House Number,Building Name"
                    value={userBuilding}
                    onChange={handleUserBuildingNameChange}
                />
            </div>

            <div className="flex flex-col gap-0">
                <label
                    htmlFor="address"
                    className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                >
                    Area
                </label>
                <AutoCompleteInput
                    setAddress={setAddress}
                    handleManualInputChange={handleManualInputChange}
                    streetAndNumber={address.streetAndNumber}
                    address={address}
                />
            </div>

            <div className="flex flex-col justify-stretch">
                <label
                    htmlFor="city"
                    className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                >
                    City
                </label>
                <input
                    className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                    type="text"
                    id="city"
                    placeholder="City"
                    defaultValue={address.place}
                    onChange={(event) =>
                        handleManualInputChange(event, 'place')
                    }
                />
            </div>

            <label
                htmlFor="state"
                className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
            >
                State/Region
            </label>
            <input
                className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                type="text"
                id="state"
                placeholder="State/Province/Region"
                defaultValue={address.region}
                onChange={(event) => handleManualInputChange(event, 'region')}
            />

            <div className=" grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-0 sm:col-span-1 col-span-2">
                    <label
                        htmlFor="postcode"
                        className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                    >
                        Postcode
                    </label>
                    <input
                        className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                        type="text"
                        id="postcode"
                        placeholder="Postcode"
                        defaultValue={address.postcode}
                        onChange={(event) =>
                            handleManualInputChange(event, 'postcode')
                        }
                    />
                </div>

                <div className="flex flex-col gap-0 sm:col-span-1 col-span-2">
                    <label
                        htmlFor="country"
                        className=" ms-1 font-default-font-family text-text-grey text-[0.8rem]"
                    >
                        Country
                    </label>
                    <input
                        className="outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] bg-[#f5f5f5] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md w-[100%]"
                        type="text"
                        id="country"
                        placeholder="Country"
                        defaultValue={address.country}
                        onChange={(event) =>
                            handleManualInputChange(event, 'country')
                        }
                    />
                </div>
            </div>

            <div className="flex justify-between mt-3">
                <div className="w-[48%]">
                    {isEditable ? (
                        <button
                            type="submit"
                            className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                        >
                            Edit Address
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-3 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                        >
                            Save Address
                        </button>
                    )}
                </div>
                <div className="w-[48%]">
                    <button
                        type="reset"
                        className="w-[100%] bg-[white] border border-[#1444EF] text-[#1444EF] lg:p-3 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-md rounded-sm lg:text-normal text-[0.8rem] "
                        onClick={() =>
                            setAddress({
                                streetAndNumber: '',
                                place: '',
                                region: '',
                                postcode: '',
                                country: '',
                                latitude: '',
                                longitude: ''
                            })
                        }
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
}
