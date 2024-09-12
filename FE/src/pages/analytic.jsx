import AnaliticCardBig from "../components/analiticCard/analiticCardBig";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Analytic = ({ sensor }) => {
     // endpoint untuk dryness : https://backend-agustrisa.as1.pitunnel.net/api/trend/dryness?period=now
     // endpint untuk suhu : https://backend-agustrisa.as1.pitunnel.net/api/trend/suhu?period=now
     // endpoint untuk tekanan : https://backend-agustrisa.as1.pitunnel.net/api/trend/tekanan?period=now
     // endpoint untuk flow : https://backend-agustrisa.as1.pitunnel.net/api/trend/flow?period=now
     // endpoint untuk daya : https://backend-agustrisa.as1.pitunnel.net/api/trend/daya?period=now

     // https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/suhu?period=daily
     // https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/tekanan?period=daily
     // https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/flow?period=daily
     // https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/daya?period=daily
     // https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/dryness?period=daily

     // data realtime
     // https://backend-agustrisa.as1.pitunnel.net/api/dataRealtime

     const [data, setData] = useState([]);
     const [dataStaitstic, setDataStatistic] = useState([]);
     const [dataCard, setDataCard] = useState({}); // dummy
     const [period, setPeriod] = useState();
     const [dataRealtime, setDataRealtime] = useState({});

     // dummy

     // dummy
     const fetchData = async (trend, period) => {
          console.log("fetching data");
          // narasi trend
          const resNarasi = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/trend/${trend}?period=${period}`
          );
          const data = await resNarasi.json();
          console.log(data);
          setPeriod(period);
          setData(data);

          const resStatistic = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/${trend}?period=${period}`
          );
          const dataStatistic = await resStatistic.json();
          setPeriod(period);
          setDataStatistic(dataStatistic);
          console.log(dataStatistic);

          return null;
     };

     const getDataRealTime = async () => {
          const res = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/dataRealtime`
          );
          const data = await res.json();
          setDataRealtime(data);
          console.log(data);
     };

     const setTrendData = () => {
          const value = (Math.random() * (100.5 - 99.0) + 99.0).toFixed(2);
          return value;
     };

     useEffect(() => {
          getDataRealTime();
     }, []);

     return (
          <>
               <div className="flex flex-wrap justify-around pt-24 w-full ">
                    contoh untuk drness
                    {/* 3 tombol 
                    daily, monthly, yearly, now(deafult)
                    */}
                    <div className="flex flex-row justify-around w-full">
                         <button
                              onClick={() => {
                                   console.log("click");
                                   fetchData("dryness", "daily");
                              }}
                              className="bg-blue-950 text-white p-2 rounded-lg">
                              Daily
                         </button>
                         <button
                              onClick={() => fetchData("dryness", "monthly")}
                              className="bg-blue-950 text-white p-2 rounded-lg">
                              Monthly
                         </button>
                         <button
                              onClick={() => fetchData("dryness", "yearly")}
                              className="bg-blue-950 text-white p-2 rounded-lg">
                              Yearly
                         </button>
                    </div>
               </div>

               <AnaliticCardBig
                    titleCard="Dryness"
                    dataCard={
                         dataRealtime.dryness
                              ? dataRealtime.dryness.toString()
                              : "N/A"
                    } // Check if dryness exists
                    trendData={setTrendData()}
                    idx={0}
                    activeIdx={0}
                    onClick={() => console.log("click")}
               />
          </>
     );
};

Analytic.propTypes = {
     sensor: PropTypes.string,
};

export default Analytic;
