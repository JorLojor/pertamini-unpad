import React, { useState } from 'react';
import Success from '../../assets/success.svg';
import Warning from '../../assets/warning.svg';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/userSlice';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Modal = ({ type, close, data }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const animationVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/login'); 
        close(); 
    };

    const handleKalibrasi = async () => {
        setLoading(true);
        setFailed(false); 
        const dataSend = {sensorType: data.name === 'temperature' ? 'temperature' : data.name, minValue: data.value.min, maxValue: data.value.max}; 
        
        try {
            const response = await axios.post('https://backend-agustrisa.as1.pitunnel.net/api/setCalibration', dataSend);
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error) {
            console.log(error); 
            setFailed(true); 
        } finally {
            setLoading(false);
        }
    };

    const handleBatas = async () => {
        setLoading(true);
        setFailed(false);
        const dataSend = {type: data.name, batasAtas: data.value.max, batasBawah: data.value.min};

        try {
            const response = await axios.post('https://backend-agustrisa.as1.pitunnel.net/api/setlimit', dataSend);
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
            setFailed(true);
        } finally {
            setLoading(false);
        }
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
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded hover:bg-[#262937] hover:text-[#ffff]" onClick={close}>Kembali</button>
                        <button className="btn w-96 h-14 border-2 bg-[#262937] text-white px-4 py-2 rounded hover:bg-[#ffff] hover:text-[#002E1A]" onClick={handleLogout}>Log Out</button>
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
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded  hover:bg-[#262937] hover:text-[#ffff]" onClick={close}>Kembali</button>
                        <button className="btn w-96 h-14 border-2 bg-[#262937] text-white px-4 py-2 rounded hover:bg-[#ffff] hover:text-[#002E1A]" onClick={handleKalibrasi}>Ya Kalibrasi</button>
                    </div>
                </div>
            </>
        );
    };

    const contentLoading = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Proses...</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-[#262937]"></div>
                    <h6 className="text-lg font-semibold mt-4">Loading...</h6>
                </div>
            </>
        );
    };

    const contentSuccess = (message) => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Proses Berhasil</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6">
                    <motion.img
                        src={Success}
                        alt="Success Logo"
                        className="mx-auto mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <h6 className="text-lg font-semibold text-center">{message}</h6>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded" onClick={close}>Tutup</button>
                        <button className="btn w-96 h-14 bg-[#262937] text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>Kembali ke Dashboard</button>
                    </div>
                </div>
            </>
        );
    };

    const contentFailed = (message) => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Proses Gagal</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6">
                    <h6 className="text-lg font-semibold text-center">{message}</h6>
                    <div className="mt-4 flex justify-center">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded hover:bg-[#262937] hover:text-[#ffff]" onClick={close}>Tutup</button>
                    </div>
                </div>
            </>
        );
    };

    const contentBatas = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Konfirmasi Batas Sensor</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p>
                </div>
                <div className="p-6">
                    <h6 className="text-lg font-semibold">Apakah Anda Yakin Akan Menetapkan Batas untuk Sensor {data?.name}?</h6>
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
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded  hover:bg-[#262937] hover:text-[#ffff]" onClick={close}>Kembali</button>
                        <button className="btn w-96 h-14 border-2 bg-[#262937] text-white px-4 py-2 rounded hover:bg-[#ffff] hover:text-[#002E1A]" onClick={handleBatas}>Ya, Tetapkan Batas</button>
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
                    {type === 2 && !loading && !success && !failed && contentKalibrasi()}
                    {type === 2 && loading && contentLoading()}
                    {type === 2 && success && contentSuccess('Kalibrasi sensor berhasil!')}
                    {type === 2 && failed && contentFailed('Kalibrasi sensor gagal. Silakan coba lagi.')}
                    {type === 3 && !loading && !success && !failed && contentBatas()}
                    {type === 3 && loading && contentLoading()}
                    {type === 3 && success && contentSuccess('Batas sensor berhasil disimpan!')}
                    {type === 3 && failed && contentFailed('Gagal menyimpan batas sensor. Silakan coba lagi.')}
                </div>
            </motion.div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={close}></div>
        </>
    );
};

export default Modal;
