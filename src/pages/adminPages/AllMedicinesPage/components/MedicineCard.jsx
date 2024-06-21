import React, { useRef } from 'react';
import Bottle from '../../../../assets/images/Bottle.png';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import handleConfirmAlert from '../../../../utils/ConfirmTemplate';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteProducts } from '../../../../features/productSlice';
import { useDispatch } from 'react-redux';
import { fetchProductLists } from '../../../../features/productSlice';
import GenericModal from '../../../../components/GenericModal';
import { useState } from 'react';
import GlobalInput from '../../../../components/GlobalInput';
import { updateProducts } from '../../../../features/productSlice';
import Button from '../../../../components/Button';
import showAlert from '../../../../components/showAlert';
import { RxCross2 } from 'react-icons/rx';
import { notify } from '../../../../App';
import { price } from '../../../../validators/validatZod';

const options = ['Delete', 'Edit'];

const MedicineCard = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showModel, setShowModal] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const editMedsNameRef = useRef();
    const editMedsPriceRef = useRef();
    const editMedsPackSizeRef = useRef();
    const compositionRef = useRef();
    const editmanufacturerNameRef = useRef();
    const [compositions, setCompositions] = useState(props?.compositions);
    const addCompositions = (e) => {
        const compositionValue = compositionRef.current.value.trim();
        if (e.code === 'Enter' && compositionValue) {
            e.preventDefault();
            e.target.value = '';
            setCompositions([...compositions, compositionValue]);
        }
    };

    const deleteTag = (val) => {
        let remainComposition = compositions.filter((item) => item !== val);
        setCompositions(remainComposition);
    };

    const handleClick = (e) => {
        setAnchorEl(e.target);
    };
    const handleMedsDelete = () => {
        handleConfirmAlert(
            'question',
            '',
            'Are you sure, you want to delete ?',
            'Delete',
            () => {
                dispatch(deleteProducts(props?.id));
                showAlert('success', 'Medicine has been successfully deleted');
                dispatch(fetchProductLists(props?.page));
            }
        );
    };

    const handleMedsEdit = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditDelete = (option) => {
        option === 'Edit' ? handleMedsEdit() : handleMedsDelete();
        handleClose();
    };

    const editedMedsValue = () => {
        if (
            editMedsNameRef?.current?.value?.trim() === '' ||
            editMedsPriceRef?.current?.value?.trim() === '' ||
            editMedsPackSizeRef?.current?.value?.trim() === '' ||
            editmanufacturerNameRef?.current?.value?.trim() === '' ||
            !compositions.length
        ) {
            notify('Fill all the fields');
            return;
        }
        const priceCheck = price.safeParse({price:parseInt(editMedsPriceRef?.current?.value)});
        if (!priceCheck.success) {
            notify('Price cannot be negative');
            return;
        }
        const medsObj = {
            name: editMedsNameRef.current.value.trim(),
            price: editMedsPriceRef.current.value.trim(),
            packSizeLabel: editMedsPackSizeRef.current.value.trim(),
            compositions: compositions,
            manufacturerName: editmanufacturerNameRef?.current?.value.trim(),
            id: props?.id
        };
        dispatch(updateProducts(medsObj));
        setShowModal(false);
    };

    return (
        <div className="border rounded-2xl gap-3 grid grid-cols-12 p-5 bg-white ">
            {showModel && (
                <GenericModal
                    onClose={() => setShowModal(false)}
                    heading={`Edit Medicine`}
                >
                    <div className="w-[400px]">
                        <GlobalInput
                            refValue={editMedsNameRef}
                            inputLabel={'Name'}
                            value={props?.name}
                        />
                        <div className="flex gap-3">
                            <GlobalInput
                                refValue={editMedsPriceRef}
                                inputLabel={'Price (in ₹)'}
                                value={props.price}
                            />
                            <GlobalInput
                                refValue={editMedsPackSizeRef}
                                inputLabel={'Pack Size Label'}
                                value={props?.packSizeLabel}
                            />
                        </div>
                        <div className="mt-2 ">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Composition
                            </p>
                            <div className="flex">
                                <div className=" mt-1 text-sm p-1 gap-1 rounded-md w-[100%] border border-[#C0CAD4] flex flex-wrap">
                                    {compositions?.map((item, index) => {
                                        return (
                                            <div
                                                className=" 
                                             bg-[#DBE0F1] outline-none border-none rounded-sm px-2 m-1 flex items-center max-w-[130px]"
                                                key={index}
                                            >
                                                <div className="max-w-[100px] truncate h-[100%] text-[0.94rem]text-[#1444EF]">
                                                    {item}{' '}
                                                </div>
                                                <h3
                                                    onClick={() =>
                                                        deleteTag(item)
                                                    }
                                                    className="border border-[#DBE0F1]  px-1 cursor-pointer"
                                                >
                                                    {' '}
                                                    <RxCross2 />
                                                </h3>
                                            </div>
                                        );
                                    })}
                                    <input
                                        className=" outline-none ms-2 font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] lg:py-[0.7rem] py-[0.4rem] text-[0.9rem] w-[90%] font-medium"
                                        type="text"
                                        placeholder="Paracetamol"
                                        ref={compositionRef}
                                        onKeyDown={addCompositions}
                                    />
                                </div>
                            </div>
                        </div>
                        <GlobalInput
                            refValue={editmanufacturerNameRef}
                            value={props?.manufacturer}
                            inputLabel={'Manufacturer'}
                        />

                        <div className=" my-4">
                            <Button handleClick={editedMedsValue}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </GenericModal>
            )}
            <div className="h-[60px] w-[60px] bg-product-bg rounded-lg col-span-1 flex justify-center items-center">
                {props?.image !== undefined ?
                    <img
                        src={`http://localhost:3003/images/${props?.image}`}
                        alt="card-image"
                        className="p-1"
                    /> :
                    <img
                        src={Bottle}
                        alt="card-image"
                        className="w-[20px] h-[40px]"
                    />}
            </div>

            <div className="ms-5 col-span-2">
                <h3 className="text-[0.94rem] text-[#000000] mb-1 overflow-x-scroll text-nowrap no-scrollbar">
                    {props?.name}
                </h3>
                <h3 className="text-[0.9rem] text-[#1444EF] ">
                    MRP : ₹{props?.price}
                </h3>
            </div>

            <div className="col-span-3 flex items-start flex-col">
                <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                    Manufacturer
                </h4>
                <h3 className="text-[0.94rem] text-[#000000] ">
                    {props?.manufacturer}
                </h3>
            </div>

            <div className="col-span-2">
                <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                    Pack Size Label
                </h4>
                <h3 className="text-[0.94rem] text-[#000000] overflow-x-scroll text-nowrap no-scrollbar ">
                    {props?.packSizeLabel}
                </h3>
            </div>

            <div className="col-span-3 w-[100%]">
                <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                    Compositions
                </h4>
                {props?.compositions?.map((item) => {
                    return (
                        <h3 className="text-[0.94rem] text-[#000000] truncate">
                            {item}
                        </h3>
                    );
                })}
            </div>

            <div className=" flex justify-center items-center h-[100%]">
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                width: '20ch'
                            }
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option}
                                onClick={() => {
                                    handleEditDelete(option);
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default MedicineCard;
