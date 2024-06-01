import GlobalInput from '../../../components/GlobalInput';
import Button from '../../../components/Button';
const AddNewAddress = ({ isOpen, setIsOpen }) => {
    const closeModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${
                isOpen ? '' : 'hidden'
            }`}
        >
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <div className="flex justify-between items-center mb-5">
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    className="
         text-start my-1 text-2xl font-medium"
                >
                    Address
                </div>
                <div className=" text-black font-default-font-family">
                    Select Address Type:
                    <div className="my-3 flex gap-2">
                        <label>
                            <input type="checkbox" />
                            Home
                        </label>
                        <button className="border-[0.1rem] text-grey border-grey px-2 py-1 rounded-md hover:border-button hover:text-button">
                            Work
                        </button>
                        <button className="border-[0.1rem] text-grey border-grey px-2 py-1 rounded-md hover:border-button hover:text-button">
                            Hotel
                        </button>
                        <button className="border-[0.1rem] text-grey border-grey px-2 py-1 rounded-md hover:border-button hover:text-button">
                            Other
                        </button>
                    </div>
                    <div>
                        <GlobalInput inputLabel="Reciever's Name " />
                        <GlobalInput inputLabel="Phone Number " />
                        <GlobalInput inputLabel="House Number, Building Name " />
                        <GlobalInput inputLabel="Road Name, Area, Locality " />
                        <GlobalInput inputLabel="Landmark (Optional) " />
                    </div>
                    <Button>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default AddNewAddress;
