import { FaCircle } from "react-icons/fa";
import propTypes from 'prop-types';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../assets/dashboard.svg";
import Analytic from "../../assets/analytic.svg";
import Kalibrasi from "../../assets/kalibrasi.svg";
import Logout from "../../assets/Logout.svg";
import { useState } from "react";
import Modal from "../../components/modal/modal";

const Sidebar = ({ buka, toggleSidebar }) => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);

  const handleCloseModal = () => {
    setLogoutModal(false);
  };

  return (
    <motion.div
      animate={{ width: buka ? '21.5rem' : '6.25rem' }}
      transition={{ duration: 0.5 }}
      className={`sidebar bg-gray-800 h-full flex flex-col fixed top-0 left-0`}
      onClick={buka ? null : toggleSidebar}
    >
      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer border-b border-b-zinc-600"
        onClick={() => navigate('/dashboard')}
      >
        <FaCircle size={60} className="text-white" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl"
          >
            SMS Tech
          </motion.p>
        )}
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 mt-8 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        <img className={`${buka ? 'm-x-0' : 'mx-auto'}`} src={Dashboard} alt="Dashboard Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            Dashboard
          </motion.p>
        )}
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 mt-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer"
        onClick={() => navigate('/analytic')}
      >
        <img className={`${buka ? 'm-x-0' : 'mx-auto'}`} src={Analytic} alt="Analytic Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            Analytic
          </motion.p>
        )}
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 mt-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer"
        onClick={() => navigate('/kalibrasi')}
      >
        <img className={`${buka ? 'm-x-0' : 'mx-auto'}`} src={Kalibrasi} alt="Kalibrasi Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            Kalibrasi
          </motion.p>
        )}
      </div>

      <div className="button-sidebar flex flex-row space-x-4 items-center p-4 mt-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer"
        onClick={() => setLogoutModal(true)}
      >
        <img className={`${buka ? 'm-x-0' : 'mx-auto'}`} src={Logout} alt="Logout Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            Keluar
          </motion.p>
        )}
      </div>

      {logoutModal && <Modal type={2} close={handleCloseModal} />} {/* Corrected here */}
    </motion.div>
  );
};

Sidebar.propTypes = {
  buka: propTypes.bool.isRequired,
  toggleSidebar: propTypes.func.isRequired,
};

export default Sidebar;
