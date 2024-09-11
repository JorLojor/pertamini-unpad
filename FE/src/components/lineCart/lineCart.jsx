import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const LineChart = ({ chartData, title }) => {
     const chartOptions = {
          chart: {
               height: 350,
               type: "line",
               zoom: { enabled: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "straight" },
          title: {
               text: title || "Chart Data",
               align: "left",
          },
          grid: {
               row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
               },
          },
          xaxis: {
               type: "category",
               categories: chartData.map((data) => data.x),
          },
          tooltip: {
               enabled: true,
               y: {
                    format: "HH:mm:ss",
               },
          },
     };

     return (
          <div className="bg-white p-6  rounded-lg">
               {chartData.length === 0 && (
                    <p className="text-center">No data available</p>
               )}
               {chartData[0] === "kosong" && (
                    <p className="text-center">Data is empty</p>
               )}
               <ReactApexChart
                    options={chartOptions}
                    series={[
                         {
                              name: "Value",
                              data: chartData.map((data) => data.y),
                         },
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
