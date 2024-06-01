import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PharmacistOrderPreview from './PharmacistOrderPreview';

const ParmacistOrderModal = ({ onClose, data }) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex "
            >
                <div className=" bg-white rounded-md md:rounded-2xl m-auto md:py-5 pb-1 w-fit min-h-[50%]">
                    <div className="w-[100%] lg:px-5 flex max-w-[768px] relative">
                        <PharmacistOrderPreview order={data} />
                        <button
                            className="border border-gray-300 rounded-md p-1 mb-auto absolute right-12 top-7"
                            onClick={onClose}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParmacistOrderModal;
