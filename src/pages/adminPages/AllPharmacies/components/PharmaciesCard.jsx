import React, { useState } from 'react';
import ParmaciesModal from './ParmaciesModal';
import SwitchButton from '../../../../components/SwitchButton';

const PharmaciesCard = ({ PharmaData }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div
                className="border w-[100%] rounded-xl gap-3 grid grid-cols-12  mt-3 p-4 bg-white cursor-pointer"
                onClick={() => {
                    setShowModal(!showModal);
                }}
            >
                <div className="col-span-3">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Pharmacy Name
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] ">
                        {PharmaData.name}
                    </h3>
                </div>

                <div className="col-span-2 ">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Phone No
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] ">
                        {PharmaData?.phone}
                    </h3>
                </div>

                <div className="col-span-2">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Pharmacist Name
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] ">
                        {PharmaData?.pharmacistId?.name}
                    </h3>
                </div>

                <div className="col-span-5">
                    <h4 className="text-[0.9rem] text-[#737A83] mb-1">
                        Pharmacy Address
                    </h4>
                    <h3 className="text-[0.94rem] text-[#000000] ">
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
            {showModal && (
                <ParmaciesModal
                    onClose={() => setShowModal(false)}
                    PharmaData={PharmaData}
                />
            )}
        </>
    );
};

export default PharmaciesCard;
