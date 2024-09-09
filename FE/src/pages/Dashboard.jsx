import { useState, useEffect } from "react";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/Sidebar";
import CardDashboard from "../components/cardDashboard/cardDashboard";
import LineChart from "../components/lineCart/lineCart";

const Dashboard = () => {
     const [buka, setBuka] = useState(false);
     const [dataCard, setDataCard] = useState({});

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
                    <Sidebar buka={buka} />
               </div>

               <div className=" flex flex-row mt-24 space-x-7 w-max">
                    <CardDashboard
                         titleCard="dryness"
                         dataCard={dataCard.dryness_steam}
                         trendData={generateRandomValue()}
                    />
                    <CardDashboard
                         titleCard="suhu"
                         dataCard={dataCard.suhu}
                         trendData={generateRandomValue()}
                    />
                    <CardDashboard
                         titleCard="tekanan"
                         dataCard={dataCard.tekanan}
                         trendData={generateRandomValue()}
                    />
                    <CardDashboard
                         titleCard="flow"
                         dataCard={dataCard.flow}
                         trendData={generateRandomValue()}
                    />
                    <CardDashboard
                         titleCard="daya"
                         dataCard={dataCard.energi}
                         trendData={generateRandomValue()}
                    />
               </div>
               <div className="mt-10">
                    <LineChart />
               </div>
          </>
     );
};

export default Dashboard;
