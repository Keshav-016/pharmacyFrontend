import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
const GenericModal = ({ children, onClose, heading }) => {
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
                <div className=" bg-white rounded-2xl m-auto p-7 flex-col gap-5 items-center w-[90%] sm:w-[70%] md:w-auto ">
                    <div className="flex justify-between sm:gap-[200px]">
                        <h2 className="text-[1.2rem] font-medium">{heading}</h2>
                        <button
                            className="border border-gray-300 rounded-md px-1 "
                            onClick={onClose}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default GenericModal;
