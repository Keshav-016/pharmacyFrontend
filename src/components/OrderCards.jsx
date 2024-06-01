import { GridItem } from '@chakra-ui/react';
import { ListItem } from 'flowbite-react';
import { GoTriangleRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const OrderCards = ({ item }) => {
    let total = 0;
    item?.medicines?.map((meds) => {
        total = total + Number(meds?.medicineId?.price);
        total = parseFloat(total.toFixed(2));
    });
    const navigate = useNavigate();
    const handleOrderPreview = (id, status) => {
        console.log(status);
        if (status === 'pending') {
            navigate(`/user-profile/current-order?id=${id}`);
        } else if (status === 'accepted') {
            navigate(`/user-profile/view-order?id=${id}`);
        } else {
            navigate(`/user-profile/view-order?id=${id}`);
        }
    };

    return (
        <>
            <div
                className=" cursor-pointer flex flex-col rounded-lg border-[0.1rem] bg-[#f5f5f5] w-[100%] mx-auto"
                onClick={() => {
                    handleOrderPreview(item._id, item.status);
                }}
            >
                <div className="flex flex-col  justify-between p-5 font-default-font-family">
                    <div className="flex items-center justify-between">
                        {item?.status === 'pending' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#E47917] text-white rounded-md text-[0.9rem]">
                                {item?.status}
                            </div>
                        )}
                        {item?.status === 'accepted' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#C6791F] text-white rounded-md text-[0.9rem]">
                                {item?.status}
                            </div>
                        )}
                        {item?.status === 'delivered' && (
                            <div className="lg:px-3 lg:py-1 p-1 bg-[#1DAD23] text-white rounded-md text-[0.9rem]">
                                {item?.status}
                            </div>
                        )}
                        <div>{item.createdAt.slice(0, 10)}</div>
                    </div>
                </div>

                <div>
                    <ul className="p-5 py-2 ">
                        {item?.medicines?.map((meds) => (
                            <li
                                key={meds._id}
                                className=" flex items-center gap-2"
                            >
                                <GoTriangleRight />
                                <li className=" text-[#737A83]">
                                    {meds?.medicineId?.name}
                                </li>
                            </li>
                        ))}
                    </ul>

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

                <div className=" bg-[#E5EAF1] mt-auto p-5 lg:text-[1.2rem] text-[1rem]  font-medium rounded-b-md">
                    {item.medicines.length > 0 ? <h1>₹{total}</h1> : ''}
                </div>
            </div>
        </>
    );
};

export default OrderCards;
