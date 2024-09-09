import { FaCircle } from "react-icons/fa";
import propTypes from 'prop-types';
import { motion } from "framer-motion";

const Sidebar = ({ buka }) => {
  return (
    <motion.div
      animate={{ width: buka ? '15rem' : '4.5rem' }}
      transition={{ duration: 0.5 }}
      className={`sidebar ${buka ? 'buka' : 'tutup'} bg-gray-800 h-full flex flex-col fixed top-0 left-0`}>
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
    </motion.div>
  );
};

Sidebar.propTypes = {
  buka: propTypes.bool.isRequired,
};

export default Sidebar;
