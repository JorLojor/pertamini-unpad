import "./App.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./components/header/header";
import Sidebar from "./layout/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytic from "./pages/analytic";
import Kalibrasi from "./pages/kalibrasi";
import Batas from "./pages/Batas";
import { isMobile } from 'react-device-detect';

function App() {
     const [buka, setBuka] = useState(false);
     const [currentPage, setCurrentPage] = useState("Dashboard");
     const [selectedAnalytic, setSelectedAnalytic] = useState("");
     const [selectedSetting, setSelectedSetting] = useState("");
     const user = useSelector((state) => state.user.user);
     const navigate = useNavigate();

     useEffect(() => {
          if (!user) {
               navigate("/login");
          }
     }, [user, navigate]);

     const toggleSidebar = () => {
          setBuka(!buka);
     };

     const renderPage = () => {
          switch (currentPage) {
              case "Dashboard":
                  return <Dashboard />;
              case "Analytic":
                  return <Analytic sensor={selectedAnalytic} />;
              case "Kalibrasi":
                  return <Kalibrasi />;
              case "Batas":
                  return <Batas />; // Add this line to render the Batas page
              default:
                  return <Dashboard />;
          }
      };
      
     return (
          <>
               <Header
                    buka={buka}
                    toggleSidebar={toggleSidebar}
                    title={currentPage === "Analytic" ? `${currentPage} ${selectedAnalytic}` : currentPage}
               />
               <div
                    className="fixed h-full z-10"
                    style={{ position: "absolute", top: "0", left: "0" }}>
                    <Sidebar
                         buka={buka}
                         toggleSidebar={toggleSidebar}
                         setCurrentPage={setCurrentPage}
                         setSelectedAnalytic={setSelectedAnalytic} 
                         setSelectedSetting={setSelectedSetting} 
                         currentPage={currentPage}
                         selectedSetting={selectedSetting} 
                    />
               </div>
               <div className={`main-content ${isMobile ? 'ml-[4rem] px-2' : 'ml-[6.25rem] px-8' } w-auto bg-[#F4F6F6] min-h-[100vh]`}>
                    {renderPage()}
               </div>
          </>
     );
}

export default App;
