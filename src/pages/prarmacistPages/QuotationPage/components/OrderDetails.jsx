import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import ButtonOutlined from '../../../../components/ButtonOutlined';
import Switch from 'react-ios-switch';
import { FaCaretRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { makeOffer } from '../../../../features/quotationsSlice';
import AddMedicineModal from './AddMedicineModal.jsx';
import showAlert from '../../../../components/showAlert.js';
import { notify } from '../../../../App.jsx';
import ImageModal from '../../../../components/ImageModal.jsx';
import ToggleSwitch from '../../../../components/ToggleSwitch.jsx';
import dayjs from 'dayjs';
import { fetchFinalOrders } from '../../../../features/orderSlice.js';
import axios from 'axios';
import { price } from '../../../../validators/validatZod.js';

const OrderDetails = ({ order, setOrder }) => {
    const [originalPrice, setOriginalPrice] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [percent, setPercent] = useState(null);
    const [inputPrice, setInputPrice] = useState(null);
    const [date, setDate] = useState(null);
    const [day, setDay] = useState(null);
    const [slot, setSlot] = useState(1);
    const [notes, setNotes] = useState('');
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const [modalImage, setModalImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    useEffect(() => {
        setOriginalPrice(
            medicines
                ?.reduce((acc, curr) => {
                    if (curr.isAvailable === true)
                        return (
                            acc + Number(curr.medicineId.price) * curr.quantity
                        );
                    else return acc + 0;
                }, 0)
                .toFixed(2)
        );
    }, [medicines]);

    useEffect(() => {
        if (!!percent)
            setInputPrice(
                parseFloat((originalPrice * (100 - percent)) / 100).toFixed(2)
            );
    }, [originalPrice]);

    useEffect(() => {
        const med = order?.medicines?.map((item) => {
            return {
                ...item,
                medicineId: { ...item.medicineId },
                isAvailable: false
            };
        });
        setMedicines(med);
        setDate(null);
        setSlot(1);
        setNotes('');
        setDay(null);
        setInputPrice(null);
        setInputPrice(null);
        setPercent(null);
    }, [order]);

    const handleDecline = async () => {
        try {
            showAlert('error', 'Offer successfully rejected');
            let total = 0;
            order?.medicines.map((meds) => {
                total =
                    total + Number(meds?.medicineId?.price) * meds?.quantity;
                total = parseFloat(total.toFixed(2));
            });
            const obj = {
                orderId: order._id,
                medicines: medicines,
                notes,
                deliveryDate: new Date(),
                deliverySlot: slot,
                price: total
            };
            dispatch(makeOffer(obj));
            const token =
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            await axios({
                method: 'DELETE',
                url: `http://localhost:3003/final-order/decline-order?orderId=${order?._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(fetchFinalOrders());
            setOrder(null);
        } catch (error) {
            notify(error?.response?.data?.message);
        }
    };

    const dateView = (date) => {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const convertedHour = hour > 12 ? hour - 12 : hour;
        const minutes = date.getMinutes();

        return `${month} ${day}, ${year}  \u00A0 ${convertedHour}:${minutes} ${hour < 12 ? 'AM' : hour < 24 ? 'PM' : 'AM'}`;
    };

    const handleOffer = () => {
        const priceCheck = price.safeParse({price:parseFloat(inputPrice)});
        if (
            medicines.reduce((acc, curr) => {
                if (curr.isAvailable == true) return acc + 1;
                else return acc + 0;
            }, 0) === 0
        ) {
            notify('please select atleast an available medicine');
        } else if (!inputPrice) {
            notify('please provide the offered price');
        } else if (!priceCheck.success) {
            notify('Offered price cannot be negative');
        }else if (!date) {
            notify('please provide the delivery date');
        } else {
            showAlert('success', 'Offer successfully placed');
            dispatch(
                makeOffer({
                    orderId: order._id,
                    medicines: medicines,
                    notes,
                    deliveryDate: date.$d,
                    deliverySlot: slot,
                    price: inputPrice
                })
            );
            setOrder(null);
        }
    };

    const handleDate = (myDate) => {
        if (myDate === 'Today') {
            setDay('Today');
            const today = new Date();
            setDate(dayjs(today));
        } else if (myDate === 'Tomorrow') {
            setDay('Tomorrow');
            const today = new Date();
            today.setDate(today.getDate() + 1);
            setDate(dayjs(today));
        }
    };

    const updateMedicine = (id) => {
        const newMedicine = medicines?.map((item, ind) => {
            if (item.medicineId._id === id)
                medicines[ind].isAvailable = !medicines[ind].isAvailable;
            return item;
        });
        setMedicines(newMedicine);
    };

    return (
        <>
            {!order ? (
                <div className="w-[100%] h-[100%] bg-white flex justify-center items-center border rounded-lg p-5 my-5">
                    <h3 className="text-text-grey text-xl">
                        Click an order to view
                    </h3>
                </div>
            ) : (
                <div className=" bg-white rounded-lg p-5 my-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center  flex-wrap">
                        <h4 className="text-4xl mb-5 text-center">
                            Order Details
                        </h4>
                        <div className="flex gap-3 min-w-[200px] mb-3">
                            <ButtonOutlined handleClick={handleDecline}>
                                Decline
                            </ButtonOutlined>
                            <Button handleClick={handleOffer}>
                                Make Offer
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row  justify-between items-start md:items-center font-default-font-family bg-grey-bg my-6 p-3 rounded-md text-[0.8rem] lg:text-[0.9rem]">
                        <div className="flex flex-col mb-3">
                            <span className=" text-text-grey">OrderID</span>
                            <span>{order?._id}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className=" text-text-grey">Placed On</span>
                            <span>{dateView(new Date(order?.createdAt))}</span>
                        </div>
                    </div>
                    <div className="flex justify-between my-6">
                        <div className="flex flex-wrap">
                            <h5 className="text-nowrap">
                                {order?.userId?.name}
                            </h5>
                            <span className="text-text-grey text-nowrap">
                                {' '}
                                (Customer Name)
                            </span>
                        </div>
                        <button className="bg-[#F11F52] text-white py-1 px-2 rounded-md ">
                            NEW ORDER
                        </button>
                    </div>
                    <div className="my-6">
                        {medicines?.map((item, index) => {
                            return (
                                <div
                                    className="flex flex-col xs:flex-row justify-between my-5 sm:my-3"
                                    key={index}
                                >
                                    <div className="flex items-center my-1 flex-wrap">
                                        <FaCaretRight color="#737A83" />
                                        <h5>{item?.medicineId?.name}</h5>
                                        <h5 className="ms-3 text-text-grey text-nowrap">
                                            QTY: {item.quantity}
                                        </h5>
                                    </div>
                                    <div className="flex items-center">
                                        <ToggleSwitch
                                            checked={item.isAvailable}
                                            setChecked={() => {
                                                updateMedicine(
                                                    item.medicineId._id
                                                );
                                            }}
                                        />
                                        <div className="min-w-[100px]">
                                            <h6 className="ms-2 text-right text-text-grey">
                                                {item?.isAvailable
                                                    ? 'Available'
                                                    : 'Unavailable'}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Link
                        className="text-primary hover:underline"
                        onClick={() => {
                            setModal(true);
                        }}
                    >
                        Add More +
                    </Link>
                    <div className="grid grid-cols-12 my-4">
                        <div className="col-span-12 md:col-span-4 mb-6 sm:mb-3">
                            <h6 className="text-text-grey text-sm mb-1">
                                MRP Total:
                            </h6>
                            <h5> ₹ {originalPrice}</h5>
                        </div>
                        <div className="col-span-12 md:col-span-4 mb-6 sm:mb-3 pe-4">
                            <h6 className="text-text-grey text-sm mb-1">
                                Shipping Address:
                            </h6>
                            <div className=" overflow-x-scroll no-scrollbar ">
                                {order?.address?.building},
                                {order?.address?.area},{order?.address?.city},
                                {order?.address?.state},
                                {order?.address?.country}, Pin -{' '}
                                {order?.address?.postcode}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 mb-6 sm:mb-3">
                            <h6 className="text-text-grey text-sm mb-1">
                                Prescriptions Uploaded:
                            </h6>
                            <div className="grid grid-cols-2">
                                {order?.prescriptions?.map((item) => {
                                    return (
                                        <div className="w-[100px] h-[100px] overflow-hidden">
                                            <img
                                                onClick={() => {
                                                    setModalOpen(true);
                                                    setModalImage(
                                                        `http://localhost:3003/images/${item}`
                                                    );
                                                }}
                                                className="object-cover w-full h-full cursor-pointer p-3 col-span-1"
                                                src={`http://localhost:3003/images/${item}`}
                                                alt="prescription"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-12 my-3">
                        <h5 className="col-span-8 md:col-span-4 text-text-grey flex items-center">
                            Offer your price:
                        </h5>
                        <div className="col-span-12 md:col-span-8 grid grid-cols-12 gap-2 py-4">
                            {[10, 15, 20, 25].map((item, ind) => {
                                return (
                                    <h5
                                        key={ind}
                                        className={`col-span-6 rounded-md px-2 py-1 border border-grey-bg cursor-pointer ${item === percent ? 'text-white bg-primary' : 'bg-[#E9EDF8] text-primary border border-btn-border'}`}
                                        onClick={() => {
                                            setPercent(item);
                                            setInputPrice(
                                                parseFloat(
                                                    originalPrice *
                                                        ((100 - item) / 100)
                                                ).toFixed(2)
                                            );
                                        }}
                                    >
                                        ₹
                                        {(
                                            originalPrice *
                                            ((100 - item) / 100)
                                        ).toFixed(2)}{' '}
                                        ({item}% OFF)
                                    </h5>
                                );
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-12  my-2">
                        <h5 className="col-span-12 md:col-span-4 text-text-grey flex items-center">
                            Offer More:
                        </h5>
                        <div className="col-span-12 md:col-span-8 flex py-4 ">
                            <CurrencyInput
                                placeholder="Your price"
                                className="p-2 me-3 rounded border border-text-grey focus:outline-none"
                                decimalsLimit={2}
                                prefix="₹  "
                                value={inputPrice}
                                onValueChange={(value, name, values) => {
                                    setInputPrice(value);
                                    setPercent(null);
                                }}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-12  my-2">
                        <h5 className="col-span-12 md:col-span-4 py-4 text-text-grey">
                            Select Delivery Date:
                        </h5>
                        <div className="col-span-12 md:col-span-8 flex py-4 flex-col">
                            <div className="flex mb-3">
                                {['Today', 'Tomorrow'].map((item) => {
                                    return (
                                        <>
                                            {day === item ? (
                                                <button className="py-2 px-4  text-white bg-primary  border border-primary rounded-lg me-2">
                                                    {item}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        handleDate(item);
                                                    }}
                                                    className="py-2 px-4  text-primary  border border-primary rounded-lg me-2"
                                                >
                                                    {item}
                                                </button>
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                            <div className="flex items-center flex-wrap ">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer
                                        sx={{ marginRight: '10px' }}
                                        components={['DatePicker']}
                                    >
                                        <DatePicker
                                            label="Delivery Date"
                                            format="DD/MM/YYYY"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12  my-2">
                        <h5 className="col-span-12 md:col-span-4 flex items-center text-text-grey">
                            Delivery time
                        </h5>
                        <div className="col-span-12 md:col-span-8 flex my-3">
                            {[1, 2].map((item) => {
                                return (
                                    <button
                                        onClick={() => setSlot(item)}
                                        className={`col-span-12 md:col-span-6 me-2 rounded-md px-2 py-1 border border-btn-border ${slot === item ? 'text-white bg-primary' : 'text-primary bg-[#E9EDF8]'} `}
                                    >
                                        {item == 1
                                            ? '9:00 am to 2:00 pm'
                                            : '2:00 pm to 7:00 pm'}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                    <textarea
                        value={notes}
                        onChange={(e) => {
                            setNotes(e.target.value);
                        }}
                        placeholder="Notes.."
                        className="focus:outline-none border border-text-grey rounded w-[100%] my-3 resize-none h-[150px] p-2"
                        name=""
                        id=""
                    ></textarea>
                    <div className="flex gap-3">
                        <ButtonOutlined>Decline</ButtonOutlined>
                        <Button handleClick={handleOffer}>Make Offer</Button>
                    </div>
                    {modal ? (
                        <AddMedicineModal
                            onClose={() => {
                                setModal(false);
                            }}
                            data={order}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            )}
            <ImageModal
                setOpen={setModalOpen}
                open={modalOpen}
                image={modalImage}
            />
        </>
    );
};

export default OrderDetails;
