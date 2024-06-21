import Footer from '../../../components/Footer';
import UserAddress from '../../../components/UserAddress';
import { useSelector, useDispatch } from 'react-redux';
import ItemInCart from './ItemInCart';
import { getCartItems } from '../../../features/userCartSlice';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import ImageModal from '../../../components/ImageModal';
import { notify } from '../../../App';
import CartEmpty from '../../../components/CartEmpty';
import CartCards from '../../../components/CartCards';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.userCart);
    const user = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    let cartArr = JSON.parse(localStorage.getItem('cartArray'));
    if (cartArr === null) {
        cartArr = [];
    }

    useEffect(() => {
        dispatch(getCartItems());
    }, [files, user]);

    let total = 0;
    cartItems?.map((item) => {
        total =
            total +
            item.quantity * item?.medicineData?.medicineId?.medicineId?.price;
        total = parseFloat(total.toFixed(2));
    });

    const handlePrescriptionUpload = (e) => {
        if (files.length >= 2)
            notify('You cannot upload more then 2 prescription');
        else {
            setFiles([...files, URL.createObjectURL(e.target.files[0])]);
            setFile([...file, e.target.files[0]]);
        }
    };

    const handleItemDelete = (item) => {
        setFiles(files.filter((ele) => ele !== item));
        setFile(files);
    };

    return (
        <>
            <div className="bg-[#EBF6F9] min-h-[90vh] flex flex-col items-center justify-between">
                <div className="   grid grid-cols-12 max-w-[1200px] sm:w-[80%] w-[100%]  mx-auto py-5  justify-start justify-items-start gap-5 lg:gap-0">
                    <div className="w-[100%]  lg:col-span-8 col-span-12 lg:px-10 px-5">
                        <div className="w-[100%] bg-white rounded-lg lg:p-5 p-4">
                            <div className=" flex sm:justify-between items-start sm:flex-row flex-col">
                                <>
                                    {cartItems?.length > 0 ||
                                    cartArr?.length > 0 ? (
                                        <span className="lg:text-[1.6rem] md:text-[1.3rem] font-medium font-default-font-family mb-5">
                                            {user.data === null ? (
                                                <span>
                                                    {cartArr.length} Total items
                                                    in your cart
                                                </span>
                                            ) : (
                                                <span>
                                                    {cartItems.length} Total
                                                    items in your cart{' '}
                                                </span>
                                            )}
                                        </span>
                                    ) : (
                                        <span className="  lg:text-[1.6rem] md:text-[1.3rem] font-medium font-default-font-family mb-5">
                                            Your cart feels so light!
                                        </span>
                                    )}
                                </>
                                <div>
                                    <label
                                        htmlFor="files"
                                        className=" bg-[#D2D8EF] py-2 px-3 font-medium  font-default-font-family hover:cursor-pointer rounded-md flex justify-center items-center"
                                    >
                                        Upload Prescription
                                    </label>
                                    <input
                                        type="file"
                                        id="files"
                                        className=" hidden my-5 rounded-md p-1 text-center text-[0.7rem]"
                                        onChange={(e) => {
                                            handlePrescriptionUpload(e);
                                        }}
                                    />
                                </div>
                            </div>
                            {cartItems?.length < 1 &&
                                cartArr?.length < 1 &&
                                files?.length < 1 && <CartEmpty />}

                            {user.data === null ? (
                                <div>
                                    {cartArr.map((item) => (
                                        <CartCards key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="lg:ps-0 ">
                                        {cartItems?.map((item) => {
                                            return (
                                                <ItemInCart
                                                    key={
                                                        item?.medicineData
                                                            ?.medicineId
                                                            ?.medicineId?._id
                                                    }
                                                    name={
                                                        item?.medicineData
                                                            .medicineId
                                                            .medicineId?.name
                                                    }
                                                    manufacturerName={
                                                        item?.medicineData
                                                            .medicineId
                                                            .medicineId
                                                            ?.manufacturerName
                                                    }
                                                    price={
                                                        item?.medicineData
                                                            .medicineId
                                                            .medicineId?.price
                                                    }
                                                    size={
                                                        item?.medicineData
                                                            .medicineId
                                                            .medicineId
                                                            ?.pack_size_label
                                                    }
                                                    id={
                                                        item?.medicineData
                                                            ?.medicineId
                                                            ?.medicineId?._id
                                                    }
                                                    item={item?.medicineData}
                                                    qty={item?.quantity}
                                                />
                                            );
                                        })}
                                    </div>

                                    <div className=" flex gap-8  justify-end mt-10">
                                        {files.length > 0
                                            ? files?.map((item, index) => (
                                                  <div
                                                      key={index}
                                                      className="rounded-lg bg-[#f5f5f5] w-[100px] h-[100px] relative"
                                                  >
                                                      <button
                                                          type="button"
                                                          className=" bg-[#696969] text-white p-1 rounded-[50%] absolute end-0"
                                                          onClick={() => {
                                                              handleItemDelete(
                                                                  item
                                                              );
                                                          }}
                                                      >
                                                          <IoClose />
                                                      </button>
                                                      <img
                                                          src={item}
                                                          alt=""
                                                          className="  bg-[#fefefe] rounded-lg  w-[100px] h-[100px] "
                                                          onClick={() => {
                                                              setModalImage(
                                                                  `${item}`
                                                              );
                                                              setOpenModal(
                                                                  true
                                                              );
                                                          }}
                                                      />
                                                  </div>
                                              ))
                                            : ''}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-[100%] lg:col-span-4 col-span-12 xl:pe-5 ">
                        <div className="w-[100%] bg-white lg:p-5 p-4 flex flex-col gap-3 rounded-lg ">
                            <UserAddress
                                files={file}
                                total={total}
                                setFiles={setFiles}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
                <ImageModal
                    open={openModal}
                    setOpen={setOpenModal}
                    image={modalImage}
                />
            </div>
        </>
    );
};

export default Cart;
