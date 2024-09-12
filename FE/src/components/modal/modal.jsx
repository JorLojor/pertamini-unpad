import React, { useState } from 'react';
import Success from '../../assets/success.svg';
import Warning from '../../assets/warning.svg';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/userSlice'; // Import logout action
import { useNavigate } from 'react-router-dom'; // Import navigate for redirection

const Modal = ({ type, close, data }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch(); // Use dispatch for Redux actions
    const navigate = useNavigate(); // Use navigate for redirection

    const animationVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action to clear user data
        navigate('/login'); // Redirect to the login page after logout
        close(); // Close the modal
    };

    const handleKalibrasi = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1000);
    };

    const contentLogout = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Verifikasi Keluar</p>
                    <p className="pr-4 cursor-pointer text-9-xl" onClick={close}>x</p>
                </div>
                <div className="p-6">
                    <img src={Warning} alt="Warning Logo" className="mx-auto mb-4" />
                    <h6 className="text-lg font-semibold">Apakah Anda Yakin Ingin Keluar?</h6>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded" onClick={close}>Kembali</button>
                        <button className="btn w-96 h-14 bg-[#262937] text-white px-4 py-2 rounded" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </>
        );
    };

    const contentKalibrasi = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Verifikasi Kalibrasi</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6">
                    <h6 className="text-lg font-semibold">Apakah Anda Yakin Akan Mengkalibrasi Sensor {data?.name} Ke</h6>
                    <div className="flex justify-center">
                        <input
                            className="border-black border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0"
                            type="number"
                            value={data?.value?.min}
                            disabled
                        />
                        <p className="text-[48px] w-full sm:w-auto text-center sm:text-left mx-4">-</p>
                        <input
                            className="border-black border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0"
                            type="number"
                            value={data?.value?.max}
                            disabled
                        />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded" onClick={close}>Kembali</button>
                        <button className="btn w-96 h-14 bg-[#262937] text-white px-4 py-2 rounded" onClick={handleKalibrasi}>Ya Kalibrasi</button>
                    </div>
                </div>
            </>
        );
    };

    const contentLoading = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Kalibrasi Sensor {data.name}</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-[#262937]"></div>
                    <h6 className="text-lg font-semibold mt-4">Loading...</h6>
                </div>
            </>
        );
    };

    const contentSuccess = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Kalibrasi Sensor {data.name} Berhasil</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6">
                    <img src={Success} alt="Success Logo" className="mx-auto mb-4" />
                    <h6 className="text-lg font-semibold">Sensor Suhu dikalibrasi ke {data?.value?.min} - {data?.value?.max}</h6>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded" onClick={close}>Tutup</button>
                        <button className="btn w-96 h-14 bg-[#262937] text-white px-4 py-2 rounded" onClick={close}>Kembali ke Dashboard</button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-[9999]"
                variants={animationVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-white rounded-lg shadow-lg max-w-[1100px] min-w-96 md:min-w-[500px]">
                    {type === 1 && contentLogout()}
                    {type === 2 && !loading && !success && contentKalibrasi()}
                    {type === 2 && loading && contentLoading()}
                    {type === 2 && success && contentSuccess()}
                </div>
            </motion.div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={close}></div>
        </>
    );
};

export default Modal;
