import { useState } from "react";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/Sidebar";

const Dashboard = () => {
     const [buka, setBuka] = useState(false);

     const toggleSidebar = () => {
          setBuka(!buka);
     };
     console.log(buka);

     return (
          <>
               <Header buka={buka}  toggleSidebar={toggleSidebar} />
               <div className="fixed h-full">
                    <Sidebar buka={buka} />
               </div>

               <div
                    className={`bg-gray-100 flex flex-col mt-16 ms-[4.5rem]`}>
                    <div className="main-content">isi dashboard</div>
               </div>
          </>
     );
};

export default Dashboard;
