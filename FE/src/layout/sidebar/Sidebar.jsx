import propTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import DashboardActive from "../../assets/dashboardActive.svg";
import Dashboard from "../../assets/dashboard.svg";
import AnalyticActive from "../../assets/analyticActive.svg";
import Analytic from "../../assets/analytic.svg";
import KalibrasiActive from "../../assets/kalibrasiActive.svg";
import Kalibrasi from "../../assets/kalibrasi.svg";
import LogoutActive from "../../assets/LogoutActive.svg";
import Logout from "../../assets/Logout.svg";
import Modal from "../../components/modal/Modal";
import Logo from "../../assets/Panjang-Putih.svg";
import logoTutup from "../../assets/SMS-Putih.svg";

const Sidebar = ({ buka, toggleSidebar, setCurrentPage, setSelectedAnalytic, currentPage, selectedAnalytic }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [analyticOpen, setAnalyticOpen] = useState(false);

  const handleCloseModal = () => {
    setLogoutModal(false);
  };

  const handleClickMenu = (menu) => {
    setCurrentPage(menu);
    if (analyticOpen) {
      toggleAnalyticDropdown();
    }
    toggleSidebar();
  };

  const handleClickMenuAnalytic = (menu) => {
    setCurrentPage("Analytic");
    setSelectedAnalytic = menu;
    toggleSidebar();
  };

  const toggleAnalyticDropdown = () => {
    if (buka) {
      setAnalyticOpen(!analyticOpen);
    }
  };

  return (
    <motion.div
      animate={{ width: buka ? "21.5rem" : "6.25rem" }}
      transition={{ duration: 0.5 }}
      className={`sidebar bg-gray-800 h-full flex flex-col fixed top-0 left-0`}
      onClick={!buka ? toggleSidebar : null}
    >
      <div
        className="button-sidebar flex flex-row space-x-4 items-center p-4 w-full hover:bg-gray-700 active:bg-gray-600 cursor-pointer border-b border-b-zinc-600"
        onClick={() => setCurrentPage("Dashboard")}
      >
        {buka ? (
          <img src={Logo} className="w-max h-[60px]" alt="logo" />
        ) : (
          <img src={logoTutup} className="w-max h-[60px]" alt="logo" />
        )}
      </div>

      <div
        className={`button-sidebar flex flex-row space-x-4 items-center p-4 mt-8 w-[80%] ${buka ? 'ml-6' : 'mx-auto'} hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
          currentPage === "Dashboard" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"
        }`}
        onClick={() => handleClickMenu("Dashboard")}
      >
        <img className={`${buka ? "mx-0" : "mx-auto"}`} src={currentPage === "Dashboard" ? DashboardActive : Dashboard } alt="Dashboard Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}s
          >
            Dashboard
          </motion.p>
        )}
      </div>

      <div
        className={`button-sidebar flex flex-row space-x-4 items-center p-4 mt-4 w-[80%] ${buka ? 'ml-6' : 'mx-auto'} hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
          currentPage === "Analytic" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"
        }`}
        onClick={toggleAnalyticDropdown}
      >
        <img className={`${buka ? "mx-0" : "mx-auto"}`} src={currentPage === "Analytic" ? AnalyticActive : Analytic} alt="Analytic Icon" />
        {buka && (
          <>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <p className="mr-4">Analytic</p>
              {analyticOpen ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
            </motion.p>
          </>
        )}
      </div>

      <AnimatePresence>
  {buka && analyticOpen && (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.5 }}
      className="z-0 overflow-hidden"
    >
      {["Dryness", "Suhu", "Tekanan", "Flow", "Daya"].map((menu) => (
        <div
          key={menu}
          className={`sub-menu ml-12 p-2 w-[70%] flex items-center justify-start hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
            selectedAnalytic === menu ? "bg-gray-700 text-white" : "text-[#BFBFBF]"
          }`}
          onClick={() => handleClickMenuAnalytic(menu)}
        >
          {/* Chevron on the left */}
          <FaChevronRight className="mr-2" /> 
          <motion.p className="text-left">{menu}</motion.p>
        </div>
      ))}
    </motion.div>
  )}
</AnimatePresence>


      <div
        className={`z-10 button-sidebar flex flex-row space-x-4 items-center p-4 mt-4 w-[80%] ${buka ? 'ml-6' : 'mx-auto'} hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
          currentPage === "Kalibrasi" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"
        }`}
        onClick={() => handleClickMenu("Kalibrasi")}
      >
        <img className={`${buka ? "mx-0" : "mx-auto"}`} src={currentPage === "Kalibrasi" ? KalibrasiActive : Kalibrasi} alt="Kalibrasi Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}s
          >
            Kalibrasi
          </motion.p>
        )}
      </div>

      <div
        className={`z-10 button-sidebar flex flex-row space-x-4 items-center p-4 mt-4 w-[80%] ${buka ? 'ml-6' : 'mx-auto'} hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
          currentPage === "Keluar" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"
        }`}
        onClick={buka ? () => setLogoutModal(true) : () => toggleSidebar()}
      >
        <img className={`${buka ? "mx-0" : "mx-auto"}`} src={currentPage === "Logout" ? LogoutActive : Logout} alt="Logout Icon" />
        {buka && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}s
          >
            Keluar
          </motion.p>
        )}
      </div>

      {logoutModal && <Modal type={1} close={handleCloseModal} />}
    </motion.div>
  );
};

Sidebar.propTypes = {
  buka: propTypes.bool.isRequired,
  toggleSidebar: propTypes.func.isRequired,
  setCurrentPage: propTypes.func.isRequired,
  setSelectedAnalytic: propTypes.func.isRequired,
  currentPage: propTypes.string.isRequired,
  selectedAnalytic: propTypes.string.isRequired,
};

export default Sidebar;
