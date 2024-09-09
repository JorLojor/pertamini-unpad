import { FaCircle } from "react-icons/fa";
import './Sidebar.css';
import propTypes from 'prop-types';

const Sidebar = ({ buka }) => {
  return (
    <div className={`sidebar ${buka ? 'buka' : 'tutup'} bg-gray-800 h-full flex flex-col`}>
      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
        <FaCircle size={30} className="text-white" />
        {buka && <p className="text-white">Fitur A</p>}
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
        <FaCircle size={30} className="text-white" />
        {buka && <p className="text-white">Fitur B</p>}
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
        <FaCircle size={30} className="text-white" />
        {buka && <p className="text-white">Fitur C</p>}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  buka: propTypes.bool.isRequired,
};

export default Sidebar;
