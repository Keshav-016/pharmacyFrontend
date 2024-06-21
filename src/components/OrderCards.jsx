import { GoTriangleRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllPharmacistOffer } from '../features/pharmacistOffersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderCards = ({ item }) => {
    let total = 0;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userOrderOffers, setUserOrderOffers] = useState();

    item?.medicines?.map((meds) => {
        total = total + Number(meds?.medicineId?.price);
        total = parseFloat(total.toFixed(2));
    });
    const handleOrderPreview = (id, status) => {
        if (status === 'pending') {
            navigate(`/user-profile/current-order?id=${id}`);
        } else if (status === 'confirmed') {
            navigate(`/user-profile/view-order?id=${id}`);
        } else {
            navigate(`/user-profile/view-order?id=${id}`);
        }
    };
    const handleReorder = async (e) => {
        try {
            e.stopPropagation();
            const token = localStorage.getItem('token');
            await axios({
                method: 'put',
                url: `http://localhost:3003/cart/reorder-item`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    cartArr: item.medicines
                }
            });
            navigate('/cart');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllPharmacistOffer(item?._id);
    }, []);

    const getAllPharmacistOffer = async (id) => {
        try {
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            const rawData = await axios({
                method: 'get',
                url: `http://localhost:3003/quotation/get-offers?orderId=${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setUserOrderOffers(rawData.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div
            className=" cursor-pointer flex flex-col rounded-lg border-[0.1rem] bg-[#f5f5f5] w-[100%] mx-auto min-h-[250px] "
            onClick={() => {
                handleOrderPreview(item?._id, item?.status);
            }}
        >
            <div className="flex flex-col  justify-between p-5 font-default-font-family">
                <div className="flex items-center justify-between">
                    {item?.status === 'pending' && (
                        <div className="lg:px-2 lg:py-1 p-1  bg-[#E47917] text-white rounded-md text-[0.8rem]">
                            {item?.status.toUpperCase()}
                        </div>
                    )}
                    {item?.status === 'confirmed' && (
                        <div className="lg:px-2 lg:py-1 p-1 bg-[#C6791F] text-white rounded-md text-[0.8rem]">
                            {item?.status.toUpperCase()}
                        </div>
                    )}
                    {item?.status === 'delivered' && (
                        <div className="lg:px-2 lg:py-1 p-1 bg-[#1DAD23] text-white rounded-md text-[0.8rem]">
                            {item?.status.toUpperCase()}
                        </div>
                    )}
                    <div>{item?.createdAt?.slice(0, 10)}</div>
                </div>

                <div className=' max-h-[200px] overflow-y-scroll no-scrollbar'>
                    <div >
                        <ul className="my-2 ">
                            {item?.medicines?.map((meds) => (
                                <li
                                    key={meds._id}
                                    className=" flex items-center gap-2"
                                >
                                    <GoTriangleRight />
                                    {meds?.medicineId?.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2 p-5 py-2">
                        {item?.prescriptions?.map((prescription) => (
                            <img
                                key={item._id}
                                className="bg-[#f5f5f5] w-[100px] h-[100px] rounded-sm border  "
                                src={`http://localhost:3003/images/${prescription}`}
                                alt="userImage"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className=" bg-[#E5EAF1] flex justify-between mt-auto p-5 lg:text-[1.2rem] text-[1rem]  font-medium rounded-b-md h-[70px]">
                {item?.medicines?.length > 0 && <span>₹{total}</span>}
                {item?.status === 'pending' && (
                    <span className="italic text-[#8e8888] font-light text-[1rem] ms-auto ">
                        {userOrderOffers?.length} Offers
                    </span>
                )}
                {item?.status === 'delivered' && (
                    <button
                        onClick={(e) => {
                            handleReorder(e);
                        }}
                        className=" bg-[#D32F2F] px-4 py-1 text-[0.9rem] rounded-md text-white"
                    >
                        Reorder
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderCards;
