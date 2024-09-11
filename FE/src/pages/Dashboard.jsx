import { useState, useEffect } from "react";
import Header from "../components/header/header";
import Sidebar from "../layout/sidebar/Sidebar";
import CardDashboard from "../components/cardDashboard/cardDashboard";
import LineChart from "../components/lineCart/lineCart";

const Dashboard = () => {
     const [buka, setBuka] = useState(false);
     const [dataCard, setDataCard] = useState({});
     const [activeIdx, setActiveIdx] = useState(null);

     const generateRandomValue = () => {
          const value = (Math.random() * (100.5 - 99.0) + 99.0).toFixed(2);
          return value;
     };

     const updateRandomData = () => {
          const drynessValue = generateRandomValue();
          const suhuValue = generateRandomValue();
          const tekananValue = generateRandomValue();
          const flowValue = generateRandomValue();
          const dayaValue = generateRandomValue();

          setDataCard({
               dryness_steam: drynessValue,
               suhu: suhuValue,
               tekanan: tekananValue,
               flow: flowValue,
               energi: dayaValue,
          });
     };

     useEffect(() => {
          updateRandomData();
          const intervalId = setInterval(updateRandomData, 2000);

          return () => clearInterval(intervalId);
     }, []);

     const toggleSidebar = () => {
          setBuka(!buka);
     };

     const handleClick = (idx) => {
          setActiveIdx((prevIdx) => (prevIdx === idx ? null : idx)); // Toggle active card
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
                    }}>
                    <Sidebar buka={buka} toggleSidebar={toggleSidebar}/>
               </div>

               <div className="main-content ml-[6.25rem] w-auto px-8 bg-[#F4F6F6]">
                    <div className="flex flex-wrap justify-around pt-24 w-full ">
                         <CardDashboard
                              titleCard="Dryness"
                              dataCard={dataCard.dryness_steam}
                              trendData={generateRandomValue()}
                              idx={0}
                              activeIdx={activeIdx}
                              onClick={handleClick}
                         />
                         <CardDashboard
                              titleCard="Suhu"
                              dataCard={dataCard.suhu}
                              trendData={generateRandomValue()}
                              idx={1}
                              activeIdx={activeIdx}
                              onClick={handleClick}
                         />
                         <CardDashboard
                              titleCard="Tekanan"
                              dataCard={dataCard.tekanan}
                              trendData={generateRandomValue()}
                              idx={2}
                              activeIdx={activeIdx}
                              onClick={handleClick}
                         />
                         <CardDashboard
                              titleCard="Flow"
                              dataCard={dataCard.flow}
                              trendData={generateRandomValue()}
                              idx={3}
                              activeIdx={activeIdx}
                              onClick={handleClick}
                         />
                         <CardDashboard
                              titleCard="Daya"
                              dataCard={dataCard.energi}
                              trendData={generateRandomValue()}
                              idx={4}
                              activeIdx={activeIdx}
                              onClick={handleClick}
                         />
                    </div>
                    <div className="pt-10">
                         <LineChart />
                    </div>
               </div>
          </>
     );
};

export default Dashboard;
