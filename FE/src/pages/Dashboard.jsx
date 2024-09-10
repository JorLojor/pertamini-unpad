import { useState } from "react";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/Sidebar";

const Dashboard = () => {
     const [buka, setBuka] = useState(false);

     const toggleSidebar = () => {
          setBuka(!buka);
     };

     return (
          <div className="w-full">
               <Header buka={buka}  toggleSidebar={toggleSidebar} />
               <div className="h-full">
                    <Sidebar buka={buka} />
               </div>

               <div
                    className={`bg-black flex flex-col mt-16 ms-[4.5rem] w-full`}>
                    <div className="main-content">isi dashboard</div>
               </div>
          </div>
     );
};

export default Dashboard;
