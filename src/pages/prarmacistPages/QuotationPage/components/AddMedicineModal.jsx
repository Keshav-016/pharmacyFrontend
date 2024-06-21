import { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import { notify } from '../../../../App';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../../../features/quotationsSlice';

const AddMedicineModal = ({ onClose, data }) => {
    const modalRef = useRef();
    const [medicine, setMedicine] = useState(null);
    const [name, setName] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [foundData, setFoundData] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };
    useEffect(() => {
        if (name === '' || name === ' ' || name === undefined || foundData) {
            setFilteredData([]);
            setFoundData(false);
        } else search(name);
    }, [name]);

    const search = async (name) => {
        try {
            const token = localStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/medicines/search-medicine?name=${name}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setFilteredData(rawData.data.data);
        } catch (e) {
            console.log(e);
            setFilteredData([]);
        }
    };

    const handleSearchBar = async (e) => {
        e.persist();
        e.target.value === ' ' ? '' : setName(e.target.value);
    };
    const handleAddMedicines = () => {
        if (name === null || name === '') {
            notify('Fill all the feilds');
        }
        dispatch(addMedicine({ medicineId: medicine, quantity, id: data._id }));
        onClose();
    };

    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex z-10 "
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
                                onChange={handleSearchBar}
                                value={name}
                            />
                            {filteredData.length ? (
                                <div className=" absolute flex flex-col p-2 rounded-md mb-3 overflow-y-scroll max-h-[9rem] bg-[#f5f5f5] no-scrollbar w-[100%] min-w-[300px] max-w-[768px] ">
                                    {filteredData.map((item) => (
                                        <div
                                            key={item._id}
                                            onClick={() => {
                                                setFoundData(true);
                                                setMedicine(item);
                                                setName(item.name);
                                            }}
                                            className="font-default-font-family flex bg-white rounded-md justify-start text-[0.9rem] p-2 text-black  mt-1 hover:bg-[#e1e1e1] hover:cursor-pointer "
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                ''
                            )}
                            <h5 className="text-text-grey text-sm mb-2">
                                quantity
                            </h5>
                            <select
                                className=" mb-3 border p-2 rounded-md block"
                                type="text"
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                }}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                                    return (
                                        <option className="bg-yellow-50">
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                            <button
                                className="w-[100%] rounded-md py-2 bg-primary text-white"
                                onClick={handleAddMedicines}
                            >
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
