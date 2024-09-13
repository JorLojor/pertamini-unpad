import "./App.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./components/header/header";
import Sidebar from "./layout/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytic from "./pages/analytic";
import Kalibrasi from "./pages/kalibrasi";

function App() {
     const [buka, setBuka] = useState(false);
     const [currentPage, setCurrentPage] = useState("dashboard");
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
                    return <Analytic />;
               case "Kalibrasi":
                    return <Kalibrasi />;
               default:
                    return <Dashboard />;
          }
     };

  return (
    <>
      <Header buka={buka} toggleSidebar={toggleSidebar} title={currentPage} />
      <div
        className="fixed h-full z-10"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <Sidebar buka={buka} toggleSidebar={toggleSidebar} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>

      <div className="main-content ml-[6.25rem] w-auto px-8 bg-[#F4F6F6] min-h-[100vh]">
        {renderPage()}
      </div>
    </>
  );
}

export default App;
