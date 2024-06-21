import { useSelector } from 'react-redux';

const AdminShowOfferCards = ({ item }) => {
    let total = 0;
    const userOrder = useSelector((state) => state.userOrders.viewingOrder);
    userOrder?.medicines?.forEach((meds) => {
        total = total + Number(meds?.medicineId?.price) * meds?.quantity;
        total = parseFloat(total.toFixed(2));
    });
    const discount = parseFloat((total - item?.price).toFixed(2));
    const discountPercent = ((discount / total) * 100).toFixed(2);

    return (
        <>
            <div className=" border-2 mt-2 rounded-md sm:w-[320px] lg:w-[100%] xl:w-[320px] w-[100%] flex flex-col justify-center text-[0.9rem] font-default-font-family  p-4 pb-6 mx-auto">
                <div className=" flex gap-2 items-start justify-start p-2 ">
                    <div className="bg-[#737A83] w-[40px] h-[40px] rounded-[50%] p-2"></div>
                    <div className="flex flex-col uppercase font-default-font-family ">
                        <span className="sm:text-[0.9rem] text-[0.8rem]">
                            {item?.pharmacistId?.pharmacyId?.name}
                        </span>
                        <div className="hidden gap-2 justify-between items-center p-2 sm:flex">
                            <span className="text-[1rem] font-semibold">
                                ₹{parseFloat(item?.price).toFixed(2)}
                            </span>{' '}
                            <span className=" text-button text-[0.7rem]">
                                Discount : {discountPercent}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-center text-[0.8rem]">
                    <span className=" text-[#737A83] ">Delivery by </span>{' '}
                    {item.deliveryDate.slice(0, 10)} , before{' '}
                    {item.deliverySlot === 1 ? (
                        <span>2:00pm</span>
                    ) : (
                        <span>7:00pm</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminShowOfferCards;
