import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slice/userSlice'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import Logo from "../assets/SMS-Hitam.svg";
import Image from "../assets/LoginImage.svg";
import ID from "../assets/ID.svg";
import Password from "../assets/Password.svg";

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (id === '' || password === '') {
            setError('ID dan Password harus diisi.');
            return;
        }

        if (id === 'admin' && password === 'admin123') {
            dispatch(login({ id, role: 'admin' }));
            navigate('/');
        } else {
            setError('ID atau Password salah. Silakan coba lagi.');
        }
    };

    const closeModal = () => {
        setError('');
    };

    return (
        <div className='flex flex-wrap'>
            <div className="form text-center md:w-[50%] my-auto mx-auto">
                <img src={Logo} className='w-[80px] h-[80px] mx-auto ' alt="Logo" />
                <h1 className='text-[28px] font-bold'>Selamat Datang di SMS <br />
                    (Smart Monitoring Server) Tech</h1>
                <p className='text-[20px] font-normal mt-4'>Silahkan Isi ID dan Password untuk masuk</p>

                <div className="flex justify-center items-center mt-6">
                    <div className="flex items-center h-[80px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                        <img src={ID} alt="ID Icon" className="h-[20px] w-[20px] ml-4 mr-2" />
                        <input 
                            className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${
                                id ? 'text-black' : 'text-[#616161]'
                            }`} 
                            type="text" 
                            placeholder='ID' 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center mt-6">
                    <div className="flex items-center h-[80px] w-[80%] border-2 border-gray-300 rounded-[10px] relative">
                        <img src={Password} alt="Password Icon" className="h-[20px] w-[20px] ml-4 mr-2" />
                        <input 
                            className={`h-full w-full pl-4 pr-12 border-none outline-none text-[20px] font-normal ${
                                password ? 'text-black' : 'text-[#616161]'
                            }`} 
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)} 
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                </div>

                <button 
                    className={`${password && id ? 'bg-[black]' : 'bg-[#616161]' }  text-white h-[87px] w-[80%] rounded-[10px] mt-7 text-[20px] font-medium`} 
                    onClick={handleLogin}
                >
                    Masuk
                </button>
            </div>

            <div className="w-[100%] md:w-[50%] sm:py-4 md:py-0 px-2 flex justify-center">
                <img src={Image} className='h-[100vh]' alt="banner" />
            </div>

            {error && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">Login Error</h2>
                        <p className="text-gray-700 mb-6">{error}</p>
                        <button 
                            onClick={closeModal} 
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
