import React, { Fragment } from 'react';
import Success from '../../assets/success.svg';
import Warning from '../../assets/warning.svg';
import { motion } from 'framer-motion';

const Modal = ({ type, close }) => {
    const animationVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    const contentLogout = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Verivikasi Keluar</p>
                    <p className="pr-4 cursor-pointer text-9-xl" onClick={close}>x</p> {/* Close button */}
                </div>
                <div className="p-6">
                    <img src={Warning} alt="Warning Logo" className="mx-auto mb-4" />
                    <h6 className="text-lg font-semibold">Apa Anda Yakin ingin Keluar?</h6>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded" onClick={close}>Kembali</button>
                        <button className="btn w-96 h-14 bg-[#262937] text-white px-4 py-2 rounded">Log Out</button>
                    </div>
                </div>
            </>
        );
    };

    const contentSuccess = () => {
        return (
            <>
                <div className="title text-white flex justify-between py-4 bg-[#262937] rounded-t-lg">
                    <p className="pl-4">Kalibrasi Sensor Suhu Berhasil</p>
                    <p className="pr-4 cursor-pointer" onClick={close}>x</p> {/* Close button */}
                </div>
                <div className="p-6">
                    <img src={Success} alt="Success Logo" className="mx-auto mb-4" />
                    <h6 className="text-lg font-semibold">Sensor Suhu dikalibrasi ke 200-400</h6>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button className="btn w-96 h-14 border-2 bg-white text-[#002E1A] px-4 py-2 rounded" onClick={close}>Tutup</button>
                        <button className="btn w-96 h-14 bg-[#262937] text-white px-4 py-2 rounded">Kembali ke Dashboard</button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <Fragment>
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                variants={animationVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-white rounded-lg shadow-lg max-w-[1100px] min-w-96 md:min-w-[500px]">
                    {type === 1 && contentSuccess()}
                    {type === 2 && contentLogout()}
                    {type === 3 && contentSuccess()}
                </div>
            </motion.div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={close}></div> {/* Close on overlay click */}
        </Fragment>
    );
};

export default Modal;
