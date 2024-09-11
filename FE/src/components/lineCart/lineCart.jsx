import { useState } from "react";
import ReactApexChart from "react-apexcharts";

import "../lineCart/lineCart.css";

const LineChart = () => {
     const line = {
          shadow: {
               enabled: true,
               color: "#000",
               top: 18,
               left: 7,
               blur: 10,
               opacity: 1,
          },
     };

     const [chartData] = useState({
          series: [
               {
                    name: "Desktops",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
               },
          ],
          options: {
               chart: {
                    height: 350,
                    type: line,
                    zoom: { enabled: false },
               },
               dataLabels: { enabled: false },
               stroke: { curve: "straight" },
               title: { text: "Dryness", align: "left" },
               grid: {
                    row: {
                         colors: ["#f3f3f3", "transparent"],
                         opacity: 0.5,
                    },
               },
               xaxis: {
                    categories: [
                         "Jan",
                         "Feb",
                         "Mar",
                         "Apr",
                         "May",
                         "Jun",
                         "Jul",
                         "Aug",
                         "Sep",
                    ],
               },
          },
     });

     return (
          <div className="bg-white p-6">
               <div >
                    <ReactApexChart
                         options={chartData.options}
                         series={chartData.series}
                         type="line"
                         height={350}
                    />
               </div>
               <div id="html-dist"></div>
          </div>
     );
};

export default LineChart;
