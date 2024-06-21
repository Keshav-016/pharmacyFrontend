import AutoCompleteInput from './AutoCompleteInput';

export default function AddressForm({ address, setAddress, setShowModal }) {
    const handleManualInputChange = (event, stateProperty) => {
        const newAddress = { ...address };
        newAddress[stateProperty] = event.target.value;
        setAddress(newAddress);
    };

    const handleAddress = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className=" flex flex-col">
                <label
                    htmlFor="address"
                    className="font-default-font-family text-text-grey text-[0.8rem] "
                >
                    Address
                </label>
                <AutoCompleteInput
                    setAddress={setAddress}
                    handleManualInputChange={handleManualInputChange}
                    streetAndNumber={address.streetAndNumber}
                />

                <label
                    htmlFor="city"
                    className="font-default-font-family text-text-grey text-[0.8rem] mt-2"
                >
                    City
                </label>
                <input
                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4]  p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    type="text"
                    id="city"
                    placeholder="City"
                    value={address.place}
                    onChange={(event) =>
                        handleManualInputChange(event, 'place')
                    }
                />

                <label
                    htmlFor="state"
                    className="font-default-font-family text-text-grey text-[0.8rem] mt-2"
                >
                    State/Province/Region
                </label>
                <input
                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    type="text"
                    id="state"
                    placeholder="State/Province/Region"
                    value={address.region}
                    onChange={(event) =>
                        handleManualInputChange(event, 'region')
                    }
                />

                <label
                    htmlFor="postcode"
                    className="font-default-font-family text-text-grey text-[0.8rem] mt-2"
                >
                    Postcode
                </label>
                <input
                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4]  p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    type="text"
                    id="postcode"
                    placeholder="Postcode"
                    value={address.postcode}
                    onChange={(event) =>
                        handleManualInputChange(event, 'postcode')
                    }
                />

                <label
                    htmlFor="country"
                    className="font-default-font-family text-text-grey text-[0.8rem] mt-2"
                >
                    Country
                </label>
                <input
                    className=" outline-none font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                    type="text"
                    id="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={(event) =>
                        handleManualInputChange(event, 'country')
                    }
                />
            </div>
            <div className=" flex gap-3 mt-5">
                <button
                    type="reset"
                    className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-2 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-lg rounded-md lg:text-normal text-[0.8rem] "
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
                <button
                    type="submit"
                    onClick={handleAddress}
                    className="w-[100%] bg-[#1444EF] border border-[#1444EF] text-white lg:p-2 p-[0.4rem] font-default-font-family hover:bg-transparent hover:text-[#1444EF] lg:rounded-lg rounded-md lg:text-normal text-[0.8rem] "
                >
                    Confirm
                </button>
            </div>
        </>
    );
}
