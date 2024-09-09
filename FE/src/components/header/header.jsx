import { FiChevronRight } from "react-icons/fi";
import { SlMenu } from "react-icons/sl";
import propTypes from "prop-types";

const Header = ({ buka, toggleSidebar }) => {
     return (
          <header
               className={`bg-gray-400 fixed top-0 left-0 text-white p-4 flex justify-between items-center shadow-md w-full `}>
               <div className={`${buka ? "ms-52" : "ms-0"}`}>
                    <div className="flex items-center">
                         <button
                              onClick={toggleSidebar}
                              className="toggle-btn ml-20">
                              {buka ? (
                                   <FiChevronRight
                                        size={30}
                                        className="text-blue-500"
                                   />
                              ) : (
                                   <SlMenu size={30} className="text-white" />
                              )}
                         </button>
                         <div className="text-xl font-bold">Dashboard</div>
                    </div>
               </div>
          </header>
     );
};

Header.propTypes = {
     buka: propTypes.bool.isRequired,
     toggleSidebar: propTypes.func.isRequired,
};

export default Header;
