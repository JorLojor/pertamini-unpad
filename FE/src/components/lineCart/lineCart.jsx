import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const LineChart = ({ chartData }) => {
     const chartOptions = {
          chart: {
               height: 350,
               type: "line",
               zoom: { enabled: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "straight" },
          title: { text: "Chart Data", align: "left" },
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
     };

     return (
          <div className="bg-white p-6  rounded-lg">
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
};

export default LineChart;
