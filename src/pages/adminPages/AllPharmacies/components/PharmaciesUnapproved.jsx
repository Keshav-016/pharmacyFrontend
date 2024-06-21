import React from 'react';
import PharmaciesImage from './PharmaciesImage';
import { useState } from 'react';
import Button from '../../../../components/Button';
import ButtonOutlined from '../../../../components/ButtonOutlined';
import { useDispatch } from 'react-redux';
import {
    pharmaciesApproval,
    pharmaciesReject
} from '../../../../features/getPharmaciesSlice';
import handleConfirmAlert from '../../../../utils/ConfirmTemplate';

const pharmaciesUnapproved = ({ PharmaData }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [currCerificate, setCurrentCertificate] = useState('');

    const handleCertificate = (file) => {
        setCurrentCertificate(file);
        setOpen(true);
    };
    const handleApprove = () => {
        handleConfirmAlert(
            'question',
            'Approval',
            'Are you sure you want to approve this pharmacist?',
            'Yes Approve',
            () => {
                dispatch(pharmaciesApproval(PharmaData?._id));
            }
        );
    };

    const handleDecline = () => {
        handleConfirmAlert(
            'question',
            'Approval',
            'Are you sure you want to reject this pharmacist?',
            'Yes Decline',
            () => {
                dispatch(pharmaciesReject(PharmaData?._id));
            }
        );
    };

    return (
        <div className="mt-3 w-[100%]">
            <div className="border rounded-xl gap-3 grid grid-cols-12 p-4  bg-white">
                <div className="col-span-3">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Pharmacy Name
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] ">
                        {PharmaData?.name}
                    </h3>
                </div>

                <div className="col-span-2">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        PharmacistName
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] overflow-scroll no-scrollbar ">
                        {PharmaData?.pharmacistId?.name}
                    </h3>
                </div>

                <div className="col-span-2 truncate">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Reg. no
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] truncate">
                        {PharmaData?.registration_no}
                    </h3>
                </div>

                <div className="col-span-3">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Certificates
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] flex justify-between w-[120px] ">
                        
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCertificate(
                                    PharmaData?.certificates[0]
                                );
                            }}
                            className=" hover:cursor-pointer text-[0.8rem] text-[#1444ef] font-default-font-family"
                        >
                            view certificate 1
                        </span>
                    </h3>

                    <h3 className="text-[0.94rem] text-[#000000]  flex justify-between w-[120px] ">
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCertificate(
                                    PharmaData?.certificates[1]
                                );
                            }}
                            className="hover:cursor-pointer text-[0.8rem] text-[#1444ef]  font-default-font-family"
                        >
                            view certificate 2
                        </span>
                    </h3>
                </div>

                <div
                    className="col-span-2 justify-center align-center lg:grid lg:grid-cols-2 flex flex-col  gap-3"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div>
                        <ButtonOutlined handleClick={handleDecline}>
                            Reject
                        </ButtonOutlined>
                    </div>
                    <div>
                        <Button handleClick={handleApprove}>Approve</Button>
                    </div>
                </div>
            </div>

            <PharmaciesImage
                setOpen={setOpen}
                open={open}
                currCerificate={currCerificate}
            />
        </div>
    );
};

export default pharmaciesUnapproved;
