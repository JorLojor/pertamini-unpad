import { useState, useEffect } from "react";
import CardDashboard from "../components/cardDashboard/cardDashboard";
import LineChart from "../components/lineCart/lineCart";

const Dashboard = () => {  

     const [dataCard, setDataCard] = useState({});
     const [activeIdx, setActiveIdx] = useState(null);
     
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

     const generateRandomValue = () => {
          const value = (Math.random() * (100.5 - 99.0) + 99.0).toFixed(2);
          return value;
     };

     const handleClick = (idx) => {
          setActiveIdx((prevIdx) => (prevIdx === idx ? null : idx));
     };
   
     return (
          <>
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
          </>
     );
};

export default Dashboard;
