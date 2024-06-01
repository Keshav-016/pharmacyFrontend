import AddNewAddress from '../pages/userPages/ProfilePages/AddNewAddress';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';

const UserAddressComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userAddress, setUserAddress] = useState([]);
    const navigate = useNavigate();

    const fetchAddress = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token exists');
            }
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/user-address/get-address`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setUserAddress(rawData.data.data);
        } catch (e) {
            // localStorage.removeItem('token');
            console.log(e.response.data.message);
        }
    };

    const deleteAddress = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token exists');
            }
            const rawData = await axios({
                method: 'delete',
                url: `http://localhost:3003/user-address/delete-address?id=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAddress();
        } catch (e) {
            // localStorage.removeItem('token');
            console.log(e.response.data.message);
        }
    };

    const handleAddressDelete = (id) => {
        deleteAddress(id);
    };

    const handleAddressEdit = (id) => {
        navigate(`/user-address?item=${id}`);
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    return (
        <>
            <div className="w-[100%] bg-white rounded-md lg:p-5 p-4">
                <h1 className="text-2xl font-default-font-family text-semibold">
                    Address
                </h1>

                {userAddress.map((item) => (
                    <div
                        className=" bg-[#f5f5f5] my-8 rounded-md p-5"
                        key={item._id}
                    >
                        <div className="flex justify-between items-center">
                            <h1 className=" font-default-font-family text-normal lg:text-[1.1rem] text-[1rem]">
                                {item.type} address
                            </h1>
                            <div className="flex gap-5">
                                <div
                                    onClick={() =>
                                        handleAddressDelete(item._id)
                                    }
                                >
                                    <FaRegTrashAlt />
                                </div>
                                <div
                                    onClick={() => handleAddressEdit(item._id)}
                                >
                                    <FiEdit3 />
                                </div>
                            </div>
                        </div>
                        <div className="text-[#737A83] text-[0.9rem]">
                            <h1>{item.receiverName}</h1>
                            <div>
                                {item.address.building},{item.address.area},
                                {item.address.city},{item.address.state},
                                {item.address.country},<br />
                                Pin-{item.address.postcode}{' '}
                            </div>
                            <h1>+91 {item.phone}</h1>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center items-center">
                    <Link to="/user-address">
                        <button className="my-10 text-[0.9rem] flex text-[#1444ef] text-center underline font-default-font-family">
                            Add new Address
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserAddressComponent;
