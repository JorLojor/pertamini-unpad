import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AnaliticCardBig from "../components/analiticCard/analiticCardBig";
import AnaliticCardSmall from "../components/analiticCard/analiticCardSmall";
import LineChartAnalytic from "../components/lineCartAnalyitc/lineCartAnalytic";
import DataTableAnalytic from "../components/tableAnalytic/analyticTable";

const Analytic = ({ sensor }) => {
     const [dataRealtime, setDataRealtime] = useState({});
     const [trendData, setTrendData] = useState("");
     const [datayangbakaldioper, setDatayangbakaldioper] = useState({});
     const [minMaxAvgNow, setMinMaxAvgNow] = useState({
          minNow: 0,
          maxNow: 0,
          avgNow: 0,
          stddevNow: 0,
          //
          minDaily: 0,
          maxDaily: 0,
          avgDaily: 0,
          stddevDaily: 0,
          //
          minMonthly: 0,
          maxMonthly: 0,
          avgMonthly: 0,
          stddevMonthly: 0,
          //
          minYearly: 0,
          maxYearly: 0,
          avgYearly: 0,
          stddevYearly: 0,
     });

     const [selectedData, setSelectedData] = useState(null);
     const [selectedTitle, setSelectedTitle] = useState("Chart Data");
     const [selectedPeriod, setSelectedPeriod] = useState("daily");
     const [tableData, setTableData] = useState([]);

     const getDataRealTime = async () => {
          try {
               const res = await fetch(
                    "https://backend-agustrisa.as1.pitunnel.net/api/dataRealtime"
               );
               const data = await res.json();
               setDataRealtime(data[sensor.toLowerCase()]);
               if (sensor === "Dryness") setDatayangbakaldioper(data.dryness);
               if (sensor === "Suhu") setDatayangbakaldioper(data.temperature);
               if (sensor === "Tekanan") setDatayangbakaldioper(data.pressure);
               if (sensor === "Flow") setDatayangbakaldioper(data.flow);
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

     const fetchCardData = async () => {
          const responseDaily = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/statistics/?period=daily`
          );
          const dataDaily = await responseDaily.json();
          const responseMonthly = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/statistics/?period=monthly`
          );
          const dataMonthly = await responseMonthly.json();
          const responseYearly = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/statistics/?period=yearly`
          );
          const dataYearly = await responseYearly.json();

          const dataNow = await fetch(
               `https://backend-agustrisa.as1.pitunnel.net/api/statistics/?period=now`
          );
          const dataNowResponse = await dataNow.json();

          setMinMaxAvgNow({
               minNow: dataNowResponse[0].min_flow,
               maxNow: dataNowResponse[0].max_flow,
               avgNow: dataNowResponse[0].avg_flow,
               stddevNow: dataNowResponse[0].stddev_flow,
               minDaily: dataDaily[0].min_flow,
               maxDaily: dataDaily[0].max_flow,
               avgDaily: dataDaily[0].avg_flow,
               stddevDaily: dataDaily[0].stddev_flow,
               minMonthly: dataMonthly[0].min_flow,
               maxMonthly: dataMonthly[0].max_flow,
               avgMonthly: dataMonthly[0].avg_flow,
               stddevMonthly: dataMonthly[0].stddev_flow,
               minYearly: dataYearly[0].min_flow,
               maxYearly: dataYearly[0].max_flow,
               avgYearly: dataYearly[0].avg_flow,
               stddevYearly: dataYearly[0].stddev_flow,
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

               setTableData(
                    dataResponse.map((item, index) => ({
                         no: index + 1,
                         tanggal: item.timestamp,
                         min_value: item.min_value,
                         max_value: item.max_value,
                         avg_value: item.avg_value,
                         stddev_value: item.stddev_value,
                    }))
               );
          } catch (error) {
               console.error("Error fetching trend data:", error);
          }
     };

     const handlePeriodChange = async (e) => {
          setSelectedPeriod(e.target.value);
          const data = await fetchData(sensor, e.target.value);
          setSelectedData(
               data.map((item) => ({
                    timestamp: item.timestamp,
                    value: item.max_value,
               }))
          );
     };

     useEffect(() => {
          const interval = setInterval(() => {
               getDataRealTime();
          }, 2000);
          fetchCardData();
          return () => clearInterval(interval);
     }, [sensor]);

     useEffect(() => {
          if (selectedData) {
               handleCardClick({ sensor, rule: "max" });
          }
     }, [selectedPeriod]);

     return (
          <>
               <div className="flex-wrap md:flex-nowrap md:flex md:justify-center items-center mt-32 max-w-[1350px] mx-auto">
                    <AnaliticCardBig
                         titleCard={sensor}
                         dataCard={
                              datayangbakaldioper.data || "... loading data"
                         }
                         trendData={trendData}
                         idx={0}
                         dataStatus={datayangbakaldioper.status ?? 0}
                    />

                    <AnaliticCardSmall
                         titleCard={sensor}
                         now={minMaxAvgNow}
                         daily={minMaxAvgNow}
                         monthly={minMaxAvgNow}
                         yearly={minMaxAvgNow}
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

                    {tableData.length > 0 && (
                         <DataTableAnalytic data={tableData} />
                    )}
                    {!tableData.length && <DataTableAnalytic data={[]} />}
               </div>
          </>
     );
};

Analytic.propTypes = {
     sensor: PropTypes.string.isRequired,
};

export default Analytic;
