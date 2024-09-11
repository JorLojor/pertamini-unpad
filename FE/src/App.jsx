import './App.css';
import { useState } from "react";
import Header from "./components/header/header";
import Sidebar from "./layout/sidebar/Sidebar";
import Dashboard from './pages/Dashboard';
import Analytic from './pages/analytic';
import Kalibrasi from './pages/kalibrasi';

function App() {
  const [buka, setBuka] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setBuka(!buka);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Analytic':
        return <Analytic />;
      case 'Kalibrasi':
        return <Kalibrasi />;
      default:
        return <Dashboard />; 
    }
  };

  return (
    <>
      <Header buka={buka} toggleSidebar={toggleSidebar} title ={ currentPage} />
      <div
        className="fixed h-full z-10"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <Sidebar buka={buka} toggleSidebar={toggleSidebar} setCurrentPage={setCurrentPage} />
      </div>

      <div className="main-content ml-[6.25rem] w-auto px-8 bg-[#F4F6F6] min-h-[100vh]">
        {renderPage()}
      </div>
    </>
  );
}

export default App;
