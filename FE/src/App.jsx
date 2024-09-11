import './App.css';
import { useState } from "react";
import Header from "./components/header/header";
import Sidebar from "./layout/sidebar/Sidebar";
import Dashboard from './pages/Dashboard';
import Analytic from './pages/analytic';
import Kalibrasi from './pages/kalibrasi';

function App() {
  const [buka, setBuka] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Set default page to 'dashboard'

  const toggleSidebar = () => {
    setBuka(!buka);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytic':
        return <Analytic />;
      case 'kalibrasi':
        return <Kalibrasi />;
      default:
        return <Dashboard />; 
    }
  };

  return (
    <>
      <Header buka={buka} toggleSidebar={toggleSidebar} />
      <div
        className="fixed h-full"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "10000000",
        }}
      >
        <Sidebar buka={buka} toggleSidebar={toggleSidebar} setCurrentPage={setCurrentPage} />
      </div>

      <div className="main-content ml-[6.25rem] w-auto px-8 bg-[#F4F6F6]">
        {renderPage()}
      </div>
    </>
  );
}

export default App;
