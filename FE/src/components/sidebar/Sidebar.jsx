import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi'; 
import { FaCircle } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import './Sidebar.css';

const Sidebar = () => {
  const [buka, setBuka] = useState(false);

  const toggleSidebar = () => {
    setBuka(!buka); 
  };

  return (
    <div className={`sidebar ${buka ? 'buka' : 'tutup'} bg-gray-800 h-full flex flex-col`}>
      <button onClick={toggleSidebar} className="toggle-btn p-4">
        {buka ? 
        <FiChevronRight 
          size={30}
          className="text-blue-500"
        /> : <SlMenu
          size={30}
          className="text-white"
        /> }
      </button>
      
      {/* Mengatur hover dan active menggunakan Tailwind CSS */}
      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
        {buka && (
          <p className="text-white">Fitur A</p>
        )}
        <FaCircle size={30} className="text-white" />
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
        {buka && (
          <p className="text-white">Fitur B</p>
        )}
        <FaCircle size={30} className="text-white" />
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
        {buka && (
          <p className="text-white">Fitur C</p>
        )}
        <FaCircle size={30} className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
