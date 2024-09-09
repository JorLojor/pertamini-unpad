import { useState, useEffect } from "react";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/Sidebar";
import CardDashboard from "../components/cardDashboard/cardDashboard";
import LineChart from "../components/lineCart/lineCart";

const Dashboard = () => {
     const [buka, setBuka] = useState(false);
     const [dataCard, setDataCard] = useState({});

     const fetchDataCard = async () => {
          try {
               const response = await fetch(
                    "https://backend-agustrisa.as1.pitunnel.net/api/random-data"
               );
               const data = await response.json();
               setDataCard(data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     useEffect(() => {
          fetchDataCard();
          const intervalId = setInterval(fetchDataCard, 2000);

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
                    />
                    <CardDashboard titleCard="suhu" dataCard={dataCard.suhu} />
                    <CardDashboard
                         titleCard="tekanan"
                         dataCard={dataCard.tekanan}
                    />
                    <CardDashboard titleCard="flow" dataCard={dataCard.flow} />
                    <CardDashboard
                         titleCard="daya"
                         dataCard={dataCard.energi}
                    />
               </div>
               <div className="mt-10">
                    <LineChart />
               </div>
          </>
     );
};

export default Dashboard;
