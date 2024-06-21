import { useSelector } from 'react-redux';

const AddToCartBtn = ({
    id,
    handleIncreaseItem,
    handleNewCartItem,
    handleDecreaseItem
}) => {
    const userCart = useSelector((state) => state.userCart);

    const findIndex = userCart.findIndex(
        (ele) => ele?.medicineData?.medicineId?.medicineId?._id === id
    );

    return (
        <>
            <div className="  py-3 rounded-b-lg h-[50px]">
                {findIndex === -1 ? (
                    <div className=" flex justify-center">
                        <button
                            onClick={handleNewCartItem}
                            className=" text-[#1444EF] font-medium text-[1rem] w-[100%]"
                        >
                            Add To cart
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center  gap-5">
                        <button
                            className="border-[0.1rem] border-[#E0E0E0] px-2 rounded-sm font-medium text-[1rem]"
                            onClick={handleDecreaseItem}
                        >
                            -
                        </button>
                        <div className="font-medium text-[1rem]">
                            {userCart[findIndex].quantity}
                        </div>
                        <button
                            className="border-[0.1rem] border-[#E0E0E0] px-2 rounded-sm font-medium text-[1rem]"
                            onClick={handleIncreaseItem}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddToCartBtn;
