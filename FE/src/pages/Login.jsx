import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slice/userSlice'; 
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/SMS-Hitam.svg";
import Image from "../assets/LoginImage.svg";
import ID from "../assets/ID.svg";
import Password from "../assets/Password.svg";

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (id === 'admin' && password === 'admin123') {
            dispatch(login({ id, role: 'admin' }));
            navigate('/');
        } else {
            alert('Invalid credentials. Please try again.');
        }
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
                            className='h-full w-full pl-4 border-none outline-none text-[20px] font-normal' 
                            type="text" 
                            placeholder='ID' 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center mt-6">
                    <div className="flex items-center h-[80px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                        <img src={Password} alt="Password Icon" className="h-[20px] w-[20px] ml-4 mr-2" />
                        <input 
                            className='h-full w-full pl-4 border-none outline-none text-[20px] font-normal' 
                            type="password" 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button 
                    className='bg-[#616161] text-white h-[87px] w-[80%] rounded-[10px] mt-7 hover:bg-black text-[20px] font-medium' 
                    onClick={handleLogin}
                >
                    Masuk
                </button>
            </div>

            <div className="w-[100%] md:w-[50%] sm:py-4 md:py-0 px-2 flex justify-center">
                <img src={Image} className='h-[100vh]' alt="banner" />
            </div>
        </div>
    );
};

export default Login;
