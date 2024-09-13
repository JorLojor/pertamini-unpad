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
                    `http://localhost:3987/api/statisticsGraph?type=${sensor.toLowerCase()}&period=${period}`
               );
               const data = await resNarasi.json();
               setTrendData((Math.random() * (100.5 - 99.0) + 99.0).toFixed(2));
               return data;
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const calculateMinMaxAvg = (data) => {
          const min = Math.min(...data.map((d) => d.min_value));
          const max = Math.max(...data.map((d) => d.max_value));
          const avg = (
               data.reduce((sum, d) => sum + d.avg_value, 0) / data.length
          ).toFixed(2);

          const stddev = (
               data.reduce((sum, d) => sum + d.stddev_value, 0) / data.length
          ).toFixed(2);

          return { min, max, avg, stddev };
     };

     const fetchAndComputeStatistics = async () => {
          const dailyData = await fetchData(sensor, "daily");
          const monthlyData = await fetchData(sensor, "monthly");
          const yearlyData = await fetchData(sensor, "yearly");
          setMinMaxAvg({
               ...calculateMinMaxAvg(dailyData),
               ...calculateMinMaxAvg(monthlyData),
               ...calculateMinMaxAvg(yearlyData),
          });
     };

     const fetchDataStatisticNow = async () => {
          const nowData = await fetchData(sensor, "now");
          setDataStatisticNow({
               minNow: nowData.min_value,
               maxNow: nowData.max_value,
               avgNow: nowData.avg_value,
               stddevNow: nowData.stddev_value,
          });
     };

     const handleCardClick = async (data) => {
          try {
               const res = await fetch(
                    `http://localhost:3987/api/statisticsGraph?type=${data.sensor.toLowerCase()}&period=${
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
               fetchDataStatisticNow();
          }, 2000);
          fetchAndComputeStatistics();
          return () => clearInterval(interval);
     }, [sensor]);

     useEffect(() => {
          // Trigger chart update when period is changed
          if (selectedData) {
               handleCardClick({ sensor, rule: "min" }); // Example: You can customize which rule to update when period changes.
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
                         onClick={handleCardClick} // Handle click event
                    />
               </div>
               <div className="pt-10 flex-col">
                    <div className="bg-white rounded-lg p-4 mb-5 flex items-center justify-between">
                         <p className="text-2xl"> Sort By Period </p>
                         {/* dropdown daily, monthly, yearly */}
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
