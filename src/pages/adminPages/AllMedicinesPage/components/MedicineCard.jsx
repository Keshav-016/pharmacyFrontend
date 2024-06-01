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

const options = ['Delete', 'Edit'];

const MedicineCard = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showModel, setShowModal] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const editMedsNameRef = useRef();
    const editMedsPriceRef = useRef();
    const editMedsPackSizeRef = useRef();
    const composition = props.Composition1 + ' ,' + props.Composition2;

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
                dispatch(deleteProducts(props.id));
                showAlert('success', 'Medicine has been successfully deleted');
                dispatch(fetchProductLists(props.page));
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
        const medsObj = {
            name: editMedsNameRef.current.value,
            price: editMedsPriceRef.current.value,
            pack_size_label: editMedsPackSizeRef.current.value,
            id: props.id
        };
        dispatch(updateProducts(medsObj));
        setShowModal(false);
    };

    return (
        <div className="border rounded-2xl gap-3 grid grid-cols-12  p-5   bg-white">
            {showModel && (
                <GenericModal
                    onClose={() => setShowModal(false)}
                    heading={`Edit Medicine`}
                >
                    <div>
                        <GlobalInput
                            refValue={editMedsNameRef}
                            inputLabel={'Name'}
                            value={props.name}
                        />
                        <div className="flex gap-3">
                            <GlobalInput
                                refValue={editMedsPriceRef}
                                inputLabel={'Price (in ₹)'}
                                value={`${props.price} `}
                            />
                            <GlobalInput
                                refValue={editMedsPackSizeRef}
                                inputLabel={'Pack Size Label'}
                                value={`${props.PackSizeLabel}`}
                            />
                        </div>
                        <div className="flex flex-col gap-1 py-2">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Composition
                            </p>
                            <input
                                value={composition}
                                className=" outline-none bg-[#f5f5f5]  font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-1 py-2">
                            <p className=" font-default-font-family text-text-grey text-[0.8rem]">
                                Manufacturer
                            </p>
                            <input
                                value={props.Manufacturer}
                                className=" outline-none bg-[#f5f5f5]  font-default-font-family placeholder-[#ABABB2] placeholder-font-[0.5rem] border-[0.1rem] border-[#C0CAD4] lg:p-[0.8rem] p-[0.4rem] text-[0.9rem] font-medium rounded-md"
                            />
                        </div>
                        <div className=" my-4">
                            <Button handleClick={editedMedsValue}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </GenericModal>
            )}
            <div className="h-[60px] w-[60px] bg-slate-300 rounded-lg col-span-1 flex justify-center items-center">
                <img
                    src={Bottle}
                    alt="card-image"
                    className=" h-[55px] w-[20px]"
                />
            </div>

            <div className="ms-5 col-span-2">
                <h3 className="text-[0.94rem] text-[#000000] mb-1 overflow-x-scroll text-nowrap no-scrollbar">
                    {props.name}
                </h3>
                <h3 className="text-[0.9rem] text-[#1444EF] ">
                    MRP : {props.price}
                </h3>
            </div>

            <div className="col-span-3 flex items-start flex-col">
                <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                    Manufacturer
                </h4>
                <h3 className="text-[0.94rem] text-[#000000] ">
                    {props.Manufacturer}
                </h3>
            </div>

            <div className="col-span-2">
                <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                    Pack_size_label
                </h4>
                <h3 className="text-[0.94rem] text-[#000000] overflow-x-scroll text-nowrap no-scrollbar ">
                    {props.PackSizeLabel}
                </h3>
            </div>

            <div className="col-span-3 w-[100%]">
                <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                    Composition
                </h4>
                <h3 className="text-[0.94rem] text-[#000000] truncate">
                    {props.Composition1}
                </h3>
                <h3 className="text-[0.94rem] text-[#000000] truncate">
                    {props.Composition2}
                </h3>
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
