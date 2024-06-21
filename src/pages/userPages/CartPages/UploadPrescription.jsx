import Footer from '../../../components/Footer';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UserAddress from '../../../components/UserAddress';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { fetchUserByToken } from '../../../features/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UploadPrescription = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    useEffect(() => {
        dispatch(fetchUserByToken());
    }, []);
    const user = useSelector((state) => state.user);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png', '.jpg']
        }
    });

    const removeFile = (name) => {
        setFiles((files) => files.filter((file) => file.name !== name));
    };

    return (
        <div className="bg-[#EAF6F9] min-h-[90vh] flex flex-col items-center justify-between">
            <div className=" max-w-[1200px]   grid grid-cols-12  w-[100%]   mx-auto py-5  justify-start justify-items-start gap-5 lg:gap-0">
                <div className="w-[100%]  lg:col-span-8 col-span-12 lg:px-10 px-5">
                    <div className="w-[100%] bg-white rounded-lg lg:p-5 p-4">
                        <h1 className="lg:text-[1.6rem] text-[1.3rem] font-medium font-default-font-family">
                            Upload Prescription
                        </h1>

                        <div
                            className="lg:p-12 p-5 border-2 border-dashed flex justify-center items-center lg:rounded-xl rounded-md mt-5"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the prescription here ...</p>
                            ) : (
                                <div className="flex flex-col gap-3 justify-center items-center">
                                    <p className=" font-default-font-family">
                                        Drop your prescription here!
                                        <br />
                                        <span className=" flex justify-center items-center text-[#757575] text-[0.7rem]">
                                            (File type: .png, .jpg)
                                        </span>
                                    </p>
                                    <button className="text-[0.8rem] lg:text-normal border-[0.1rem] border-[#1444EF] p-3 text-[#1444EF] rounded-md hover:text-white hover:bg-[#1444ef] w-[100%]">
                                        Upload Prescription
                                    </button>
                                </div>
                            )}
                        </div>
                        <ul className=" grid sm:grid-cols-4 grid-cols-2 justify-items-center align-center my-5 items-center ">
                            {files.map((file) => (
                                <li className=" font-default-font-family text-[0.7rem] font-bold bg-[#f5f5f5] rounded-sm mb-3">
                                    <div className="m-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFile(file.name)
                                            }
                                            className=" bg-[#1444ef] text-white p-1 rounded-[50%]"
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                    <img
                                        src={file.preview}
                                        alt=""
                                        className=" w-[100px] h-[70px] rounded-md m-4 "
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview);
                                        }}
                                    />
                                    <div className="w-[100%] text-center pb-2 text-[#1444ef] px-1">
                                        {file.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {user.data !== null ? (
                    <div className="w-[100%] lg:col-span-4 col-span-12  lg:pe-10 px-5">
                        <div className="w-[100%] bg-white lg:p-5 p-4 flex flex-col gap-3 rounded-lg">
                            <UserAddress files={files} setFiles={setFiles} />
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    );
};

export default UploadPrescription;
