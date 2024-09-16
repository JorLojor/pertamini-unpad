import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const LineChart = ({ chartData, title }) => {
     const [showRegressionLine, setShowRegressionLine] = useState(false);
     const [dataminMax, setDataminMax] = useState({ min: 0, max: 0 });

     const dataMinMaxDesicion = (title) => {
          try {
               const dataLocal = localStorage.sensorLimits;

               if (!dataLocal) {
                    console.warn("No sensor limits found in localStorage.");
                    setDataminMax({ min: 0, max: 0 });
                    return;
               }

               const data = JSON.parse(dataLocal);

               if (title === "Temperature") {
                    setDataminMax({
                         min: data.temperature.batasBawah,
                         max: data.temperature.batasAtas,
                    });
               } else if (title === "Flow") {
                    setDataminMax({
                         min: data.flow.batasBawah,
                         max: data.flow.batasAtas,
                    });
               } else if (title === "Pressure") {
                    setDataminMax({
                         min: data.pressure.batasBawah,
                         max: data.pressure.batasAtas,
                    });
               } else if (title === "Power") {
                    setDataminMax({
                         min: data.power.batasBawah,
                         max: data.power.batasAtas,
                    });
               } else if (title === "Dryness") {
                    setDataminMax({
                         min: data.dryness.batasBawah,
                         max: data.dryness.batasAtas,
                    });
               } else {
                    setDataminMax({ min: 0, max: 0 });
               }
          } catch (error) {
               console.error("Error parsing localStorage data:", error);
               setDataminMax({ min: 0, max: 0 });
          }
     };

     useEffect(() => {
          dataMinMaxDesicion(title);
     }, [title]);

     const calculateRegressionLine = (data) => {
          if (data.length === 0 || data[0] === "kosong") return [];

          const n = data.length;
          let sumX = 0,
               sumY = 0,
               sumXY = 0,
               sumX2 = 0;

          data.forEach((point, i) => {
               const x = i;
               const y = point.y;
               sumX += x;
               sumY += y;
               sumXY += x * y;
               sumX2 += x * x;
          });

          const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;

          const regressionLine = data.map((point, i) => ({
               x: point.x,
               y: slope * i + intercept,
          }));

          return regressionLine;
     };

     const regressionLineData = calculateRegressionLine(chartData);

     const chartOptions = {
          chart: {
               height: 350,
               type: "line",
               zoom: { enabled: false },
          },
          dataLabels: { enabled: false },
          stroke: {
               curve: "straight",
               width: 2,
               animate: {
                    enabled: true,
                    duration: 300,
                    easing: "linear",
                    speed: 100,
               },
          },
          title: {
               text: title || "Chart Data",
               align: "left",
          },
          animations: {
               enabled: true,
               easing: "linear",
               speed: 800,
               animateGradually: {
                    enabled: false,
                    delay: 200,
               },
               dynamicAnimation: {
                    enabled: true,
                    speed: 350,
               },
          },
          grid: {
               row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
               },
          },
          yaxis: {
               categories: chartData.map((data) => {
                    data.y;
               }),
          },
          xaxis: {
               type: "datetime",
               categories: chartData.map((data) => new Date(data.x).getTime()),
               tickAmount: chartData.length / 2,
               labels: {
                    formatter: function (value, timestamp) {
                         return new Date(timestamp).toLocaleString();
                    },
               },
          },
          tooltip: {
               enabled: true,
               x: {
                    format: "dd/MM/yyyy HH:mm",
               },
               y: {
                    formatter: function (val) {
                         return val.toFixed(2);
                    },
               },
          },
          legend: {
               show: false,
          },
          annotations: {
               yaxis: [
                    ...(dataminMax.min !== undefined
                         ? [
                                {
                                     y: dataminMax.min,
                                     borderColor: "#00E396",
                                     strokedasharray: 2,
                                     strokeWidth: 4,
                                     label: {
                                          borderColor: "#00E396",
                                          style: {
                                               color: "#fff",
                                               background: "#00E396",
                                          },
                                          text: "Min Limit",
                                     },
                                },
                           ]
                         : []),
                    ...(dataminMax.max !== undefined
                         ? [
                                {
                                     y: dataminMax.max,
                                     borderColor: "#FF4560",
                                     label: {
                                          borderColor: "#FF4560",
                                          style: {
                                               color: "#fff",
                                               background: "#FF4560",
                                          },
                                          text: "Max Limit",
                                     },
                                },
                           ]
                         : []),
               ],
          },
     };

     return (
          <div className="bg-white p-6 rounded-lg">
               {chartData.length === 0 && (
                    <p className="text-center">No data available</p>
               )}
               {chartData[0] === "kosong" && (
                    <p className="text-center">Data is empty</p>
               )}
               <div className="flex items-center mb-4">
                    <input
                         type="checkbox"
                         id="showRegression"
                         checked={showRegressionLine}
                         onChange={() =>
                              setShowRegressionLine(!showRegressionLine)
                         }
                         className="mr-2"
                    />
                    <label htmlFor="showRegression">Show Regression Line</label>
               </div>
               <ReactApexChart
                    options={chartOptions}
                    series={[
                         {
                              name: "Value",
                              data: chartData.map((data) => data.y),
                         },
                         ...(showRegressionLine
                              ? [
                                     {
                                          name: "Regression Line",
                                          data: regressionLineData.map((data) =>
                                               parseFloat(data.y).toFixed(4)
                                          ),
                                          color: "#FF0000",
                                          stroke: {
                                               dashArray: 4,
                                          },
                                     },
                                ]
                              : []),
                    ]}
                    type="line"
                    height={350}
               />
          </div>
     );
};

LineChart.propTypes = {
     chartData: PropTypes.array,
     title: PropTypes.string,
};

export default LineChart;
