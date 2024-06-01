import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';

const AddMedicineModal = ({ onClose, data }) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex "
            >
                <div className=" bg-white rounded-2xl m-auto p-7 w-fit">
                    <div className="w-[100%] min-w-[300px] max-w-[768px] relative">
                        <div>
                            <h2 className="text-lg">Add New Medicine</h2>
                            <h5 className="text-text-grey text-sm mb-2">
                                Medicine Name
                            </h5>
                            <input
                                className="focus:outline-none w-[100%] border p-2 rounded-md mb-3"
                                placeholder="medicine name"
                                type="text"
                            />
                            <h5 className="text-text-grey text-sm mb-2">
                                quantity
                            </h5>
                            <select
                                className=" mb-3 border p-2 rounded-md block"
                                type="text"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                                    return (
                                        <option className="bg-yellow-50">
                                            {item}
                                        </option>
                                    );
                                })}
                                <option value=""></option>
                            </select>
                            <button className="w-[100%] rounded-md py-2 bg-primary text-white">
                                Add New
                            </button>
                        </div>
                        <button
                            className="absolute end-0 top-0 border border-gray-300 rounded-md p-1 mb-auto"
                            onClick={onClose}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddMedicineModal;
