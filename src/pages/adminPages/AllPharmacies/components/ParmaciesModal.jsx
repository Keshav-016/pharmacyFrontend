import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import SwitchButton from '../../../../components/SwitchButton';
import { useDispatch } from 'react-redux';
import { pharmaciesBlock } from '../../../../features/getPharmaciesSlice';

const ParmaciesModal = ({ onClose, PharmaData }) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };
    const dispatch = useDispatch();

    const handleBlockPharmacist = (checked) => {
        dispatch(
            pharmaciesBlock({
                id: PharmaData.pharmacistId._id,
                checked: checked
            })
        );
    };

    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex z-10 "
            >
                <div className=" bg-white rounded-2xl m-auto p-7 flex-col gap-5 items-center w-[90%] sm:w-[70%]  ">
                    <div className="flex justify-between">
                        <h2 className="text-[1.2rem] font-medium">
                            Pharmacy Details
                        </h2>
                        <button
                            className="border border-gray-300 rounded-md px-1 "
                            onClick={onClose}
                        >
                            <RxCross2 />
                        </button>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 ">
                        <div className="">
                            <h3 className="  text-xs text-gray-400">
                                Pharmacy Name
                            </h3>

                            <div className="flex justify-between">
                                <h3 className=""> {PharmaData?.name}</h3>

                                <div className=" flex flex-col sm:flex-row justify-center ">
                                    <SwitchButton
                                        checkedStatus={
                                            !PharmaData?.pharmacistId?.isBlocked
                                        }
                                        handleChange={(e) =>
                                            handleBlockPharmacist(
                                                !e.target.checked
                                            )
                                        }
                                    />
                                    <spane className="ml-5 w-[80px]">
                                        {PharmaData?.pharmacistId?.isBlocked
                                            ? 'Activate'
                                            : 'Deactivate'}
                                    </spane>
                                </div>
                            </div>
                        </div>

                        <div className=" md:grid gap-3  grid-cols-12  flex flex-wrap      justify-between border p-4 rounded-lg">
                            <div className="col-span-4">
                                <h3 className="  text-xs text-gray-400 mb-1">
                                    Phone No
                                </h3>
                                <h3 className="overflow-scroll no-scrollbar">
                                    {' '}
                                    {PharmaData?.phone}
                                </h3>
                            </div>
                            <div className="col-span-4 min-w-3">
                                <h3 className="  text-xs text-gray-400 mb-1">
                                    Pharmacist Name
                                </h3>
                                <h3 className=" overflow-scroll no-scrollbar ">
                                    {' '}
                                    {PharmaData?.pharmacistId?.name}
                                </h3>
                            </div>
                            <div className="col-span-4">
                                <h3 className="  text-xs text-gray-400 mb-1">
                                    Subscription Plan
                                </h3>
                                <h3 className="overflow-scroll no-scrollbar ">
                                    {' '}
                                    {PharmaData?.updatedAt?.slice(0, 10)}
                                </h3>
                            </div>
                        </div>

                        <h3 className="  text-xs text-gray-400">
                            Pharmacy Address
                        </h3>
                        <h3>
                            {PharmaData?.address?.building +
                                ', ' +
                                PharmaData?.address?.area +
                                ', ' +
                                PharmaData?.address?.landmark +
                                ', ' +
                                PharmaData?.address?.pin}
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParmaciesModal;
