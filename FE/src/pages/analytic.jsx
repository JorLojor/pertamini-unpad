import AnaliticCardBig from "../components/analiticCard/analiticCardBig";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Analytic = ({ sensor }) => {
     console.log(sensor);
     const [dataRealtime, setDataRealtime] = useState({});
     const [period, setPeriod] = useState("now");
     const [trendData, setTrendData] = useState("");

     const fetchData = async (sensor, period) => {
          try {
               const resNarasi = await fetch(
                    `https://backend-agustrisa.as1.pitunnel.net/api/trend/${sensor}?period=${period}`
               );
               const data = await resNarasi.json();
               setTrendData((Math.random() * (100.5 - 99.0) + 99.0).toFixed(2));
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const getDataRealTime = async () => {
          try {
               const res = await fetch(
                    `https://backend-agustrisa.as1.pitunnel.net/api/dataRealtime`
               );
               const data = await res.json();
               setDataRealtime(data[sensor.toLowerCase()]);
               console.log(dataRealtime);
          } catch (error) {
               console.error("Error fetching real-time data:", error);
          }
     };

     useEffect(() => {
          getDataRealTime();
     }, [sensor]);

     return (
          <>
               <div className="flex flex-wrap justify-around pt-24 w-full">
                    <div className="flex flex-row justify-around w-full">
                         <button
                              onClick={() => fetchData(sensor, "daily")}
                              className="bg-blue-950 text-white p-2 rounded-lg">
                              Daily
                         </button>
                         <button
                              onClick={() => fetchData(sensor, "monthly")}
                              className="bg-blue-950 text-white p-2 rounded-lg">
                              Monthly
                         </button>
                         <button
                              onClick={() => fetchData(sensor, "yearly")}
                              className="bg-blue-950 text-white p-2 rounded-lg">
                              Yearly
                         </button>
                    </div>
               </div>

               {/* <AnaliticCardBig
                    titleCard={sensor}
                    dataCard={
                         dataRealtime ? dataRealtime.data?.toFixed(2) : "N/A"
                    } // Handling missing data
                    trendData={trendData}
                    idx={0}
                    activeIdx={0}
                    onClick={() => console.log("click")}
                    dataStatus={dataRealtime?.status ?? 0} // Default status to 0 if undefined
               /> */}
          </>
     );
};

Analytic.propTypes = {
     sensor: PropTypes.string.isRequired, // Ensure sensor is provided as a string
};

export default Analytic;
