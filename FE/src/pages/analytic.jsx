import AnaliticCardBig from "../components/analiticCard/analiticCardBig";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AnaliticCardSmall from "../components/analiticCard/analiticCardSmall";
import LineChartAnalytic from "../components/lineCartAnalyitc/lineCartAnalytic";

const Analytic = ({ sensor }) => {
     const [dataRealtime, setDataRealtime] = useState({});
     const [trendData, setTrendData] = useState("");
     const [datayangbakaldioper, setDatayangbakaldioper] = useState({});
     const [minMaxAvg, setMinMaxAvg] = useState({
          minDaily: 0,
          maxDaily: 0,
          avgDaily: 0,
          stddevDaily: 0,
          minMonthly: 0,
          maxMonthly: 0,
          avgMonthly: 0,
          stddevMonthly: 0,
          minYearly: 0,
          maxYearly: 0,
          avgYearly: 0,
          stddevYearly: 0,
     });
     const [dataStatisticNow, setDataStatisticNow] = useState({
          minNow: 0,
          maxNow: 0,
          avgNow: 0,
          stddevNow: 0,
     });
     const [selectedData, setSelectedData] = useState(null);
     const [selectedTitle, setSelectedTitle] = useState("Chart Data");
     const [selectedPeriod, setSelectedPeriod] = useState("daily");

     const getDataRealTime = async () => {
          try {
               const res = await fetch(
                    "http://localhost:3987/api/dataRealtime"
               );
               const data = await res.json();
               setDataRealtime(data[sensor.toLowerCase()]);
               if (sensor === "Dryness") setDatayangbakaldioper(data.dryness);
               if (sensor === "Suhu") setDatayangbakaldioper(data.temperature);
               if (sensor === "Tekanan") setDatayangbakaldioper(data.pressure);
               if (sensor === "flow") setDatayangbakaldioper(data.flow);
               if (sensor === "Daya")
                    setDatayangbakaldioper(data.power_prediction);
          } catch (error) {
               console.error("Error fetching real-time data:", error);
          }
     };

     const fetchData = async (sensor, period) => {
          try {
               const resNarasi = await fetch(
                    `https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/${sensor.toLowerCase()}?period=${period}`
               );
               const data = await resNarasi.json();
               setTrendData((Math.random() * (100.5 - 99.0) + 99.0).toFixed(2));
               return data;
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const fetchAndComputeStatistics = async () => {
          const dailyData = await fetchData(sensor, "daily");
          const monthlyData = await fetchData(sensor, "monthly");
          const yearlyData = await fetchData(sensor, "yearly");

          const minDaily = Math.min(...dailyData.map((data) => data.min_value));
          const minMonthly = Math.min(
               ...monthlyData.map((data) => data.min_value)
          );
          const minYearly = Math.min(
               ...yearlyData.map((data) => data.min_value)
          );

          const maxDaily = Math.max(...dailyData.map((data) => data.max_value));
          const maxMonthly = Math.max(
               ...monthlyData.map((data) => data.max_value)
          );
          const maxYearly = Math.max(
               ...yearlyData.map((data) => data.max_value)
          );

          const avgDaily =
               dailyData.reduce((acc, data) => acc + data.avg_value, 0) /
               dailyData.length;
          const avgMonthly =
               monthlyData.reduce((acc, data) => acc + data.avg_value, 0) /
               monthlyData.length;
          const avgYearly =
               yearlyData.reduce((acc, data) => acc + data.avg_value, 0) /
               yearlyData.length;

          const stddevDaily = Math.sqrt(
               dailyData.reduce(
                    (acc, data) =>
                         acc + Math.pow(data.stddev_value - avgDaily, 2),
                    0
               ) / dailyData.length
          );
          const stddevMonthly = Math.sqrt(
               monthlyData.reduce(
                    (acc, data) =>
                         acc + Math.pow(data.stddev_value - avgMonthly, 2),
                    0
               ) / monthlyData.length
          );
          const stddevYearly = Math.sqrt(
               yearlyData.reduce(
                    (acc, data) =>
                         acc + Math.pow(data.stddev_value - avgYearly, 2),
                    0
               ) / yearlyData.length
          );

          setMinMaxAvg({
               minDaily,
               maxDaily,
               avgDaily,
               stddevDaily,
               minMonthly,
               maxMonthly,
               avgMonthly,
               stddevMonthly,
               minYearly,
               maxYearly,
               avgYearly,
               stddevYearly,
          });
     };

     const handleCardClick = async (data) => {
          try {
               const res = await fetch(
                    `https://backend-agustrisa.as1.pitunnel.net/api/statisticsGraph/${data.sensor.toLowerCase()}?period=${
                         selectedPeriod ?? "daily"
                    }`
               );
               const dataResponse = await res.json();

               if (data.rule === "min") {
                    setSelectedTitle(`Minimum ${data.sensor}`);
                    setSelectedData(
                         dataResponse.map((item) => ({
                              timestamp: item.timestamp,
                              value: item.min_value,
                         }))
                    );
               }

               if (data.rule === "max") {
                    setSelectedTitle(`Maximum ${data.sensor}`);
                    setSelectedData(
                         dataResponse.map((item) => ({
                              timestamp: item.timestamp,
                              value: item.max_value,
                         }))
                    );
               }

               if (data.rule === "avg") {
                    setSelectedTitle(`Average ${data.sensor}`);
                    setSelectedData(
                         dataResponse.map((item) => ({
                              timestamp: item.timestamp,
                              value: item.avg_value,
                         }))
                    );
               }

               if (data.rule === "stddev") {
                    setSelectedTitle(`Standard Deviation ${data.sensor}`);
                    setSelectedData(
                         dataResponse.map((item) => ({
                              timestamp: item.timestamp,
                              value: item.stddev_value,
                         }))
                    );
               }
          } catch (error) {
               console.error("Error fetching trend data:", error);
          }
     };

     const handlePeriodChange = (e) => {
          setSelectedPeriod(e.target.value);
     };

     useEffect(() => {
          const interval = setInterval(() => {
               getDataRealTime();
               // fetchDataStatisticNow();
          }, 2000);
          fetchAndComputeStatistics();
          return () => clearInterval(interval);
     }, [sensor]);

     useEffect(() => {
          if (selectedData) {
               handleCardClick({ sensor });
          }
     }, [selectedPeriod]);

     return (
          <>
               <div className="flex flex-row justify-center items-start space-x-4 mt-32">
                    <AnaliticCardBig
                         titleCard={sensor}
                         dataCard={
                              datayangbakaldioper.data || "... loading data"
                         }
                         trendData={trendData}
                         idx={0}
                         onClick={() => console.log("Clicked card")}
                         dataStatus={datayangbakaldioper.status ?? 0}
                    />

                    <AnaliticCardSmall
                         titleCard={sensor}
                         now={dataStatisticNow}
                         daily={minMaxAvg}
                         monthly={minMaxAvg}
                         yearly={minMaxAvg}
                         onClick={handleCardClick}
                    />
               </div>
               <div className="pt-10 flex-col">
                    <div className="bg-white rounded-lg p-4 mb-5 flex items-center justify-between">
                         <p className="text-2xl"> Sort By Period </p>

                         <select
                              className="border-2 border-black rounded-lg p-2"
                              onChange={handlePeriodChange}
                              value={selectedPeriod}>
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                         </select>
                    </div>
                    {selectedData && (
                         <LineChartAnalytic
                              chartData={selectedData || []}
                              title={selectedTitle}
                         />
                    )}
                    {!selectedData && (
                         <LineChartAnalytic chartData={[]} title="" />
                    )}
               </div>
          </>
     );
};

Analytic.propTypes = {
     sensor: PropTypes.string.isRequired,
};

export default Analytic;
