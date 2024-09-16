import { useState, useEffect } from "react"
import PropTypes from "prop-types";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowDown from "../../assets/ArrowDown.svg";
import DrynessIcon from "../../assets/DrynessIcon.svg";
import DrynessIconWhite from "../../assets/DrynessIconWhite.svg";
import TemperatureIconWhite from "../../assets/TemperatureIconWhite.svg";
import TemperatureIcon from "../../assets/TemperatureIcon.svg";
import PressureIcon from "../../assets/PressureIcon.svg";
import PressureIconWhite from "../../assets/PressureIconWhite.svg";
import FlowIcon from "../../assets/FlowIcon.svg";
import FlowIconWhite from "../../assets/FlowIconWhite.svg";
import PowerIcon from "../../assets/PowerIcon.svg";
import PowerIconWhite from "../../assets/PowerIconWhite.svg";
import axios from "axios";

const CardDashboard = ({ titleCard, dataCard, idx, activeIdx, onClick }) => {
     const [trendData, setTrendData] = useState({});

     console.log(titleCard.toLowerCase());
     
     const fetchTrendData = async () => {
          try {
               const response = await axios.get(`https://backend-agustrisa.as1.pitunnel.net/api/trend/${titleCard.toLowerCase()}?period=now`);
               if (response.status == 200) {
                    setTrendData(response.data)
               }
          } catch (error) {
               console.log(error);
          }
     }

     const titleDesicion = () => {
          if (titleCard === "Dryness") {
               return [DrynessIcon, DrynessIconWhite];
          }
          if (titleCard === "Temperature") {
               return [TemperatureIcon, TemperatureIconWhite];
          }
          if (titleCard === "Pressure") {
               return [PressureIcon, PressureIconWhite];
          }
          if (titleCard === "Flow") {
               return [FlowIcon, FlowIconWhite];
          }
          if (titleCard === "Power") {
               return [PowerIcon, PowerIconWhite];
          }
     };

     const symbolDesicion = () => {
          if (titleCard === "Dryness") {
               return "%";
          }
          if (titleCard === "Temperature") {
               return "°C";
          }
          if (titleCard === "Pressure") {
               return "barg";
          }
          if (titleCard === "Flow") {
               return "ton/h";
          }
          if (titleCard === "Power") {
               return "MW";
          }
     };

     const aturUkuran = (dataCard) => {
          if (dataCard === undefined || dataCard === null) {
               return {
                    value: "-",
                    fontSize: "text-xl",
               };
          }

          if (dataCard.toString().length > 5) {
               return {
                    value: Number(dataCard).toFixed(3),
                    fontSize: "text-lg",
               };
          }
          return {
               value: dataCard.toString(),
               fontSize: "text-xl",
          };
     };

     useEffect(() => {
          fetchTrendData();
     }, []);

     return (
          <div onClick={() => onClick(idx)} className={`mt-3 ${titleCard === 'Dryness' || titleCard === 'Power' ? 'w-[325px] md:w-[48%] md:h-[200px] mx-[1%] space-y-8 py-4 md:py-0' : 'w-[325px] md:w-[31%] mx-[1%] space-y-6 py-4'} col-span-1 flex flex-col items-center justify-center shadow-md rounded-lg cursor-pointer transition-colors duration-300 
            ${activeIdx === idx
                    ? "bg-blue-950 text-white"
                    : "bg-white text-green-950"
               }`}>
               <div className="flex justify-center items-center text-xl">
                    <p className="mr-1">Dev =
                         <span className={`${trendData?.trendStatus === 'naik' ? 'text-green-600' : trendData?.trendStatus === 'stabil' ? 'text-green-600' : trendData?.trendStatus === 'turun' ? 'text-red-600' : 'text-green-600'}`}>{trendData?.trendStatus === 'naik' ? '+' : trendData?.trendStatus === 'stabil' ? '+' : trendData?.trendStatus === 'turun' ? '-' : '+'}{trendData?.gradien}</span>
                    </p>
                    <p className={`text-base md:text-xl font-bold flex justify-center items-center }`}> </p>
                    {trendData?.trendStatus === 'naik' ? <img src={ArrowUp} alt="gradien" /> : trendData?.trendStatus === 'turun' ? <img src={ArrowDown} alt="gradien" /> : <img src={ArrowUp} alt="gradien" />}
               </div>
               <div className={`flex justify-center items-end font-bold ${aturUkuran(dataCard).fontSize}`}>
                    <p className={`${titleCard === 'Dryness' || titleCard === 'Power' ? 'text-2xl md:text-[64px]' : 'text-2xl md:text-[55px]'}`}>{aturUkuran(dataCard).value}</p>
                    <small className="text-base">{symbolDesicion()}</small>
               </div>
               <p className={` font-bold ${titleCard === 'Dryness' || titleCard === 'Power' ? 'text-lg md:text-[28px]' : 'text-lg md:text-[28px]'}`}>
                    {titleCard}
               </p>
          </div>
     );
};

CardDashboard.propTypes = {
     titleCard: PropTypes.string,
     dataCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     trendData: PropTypes.string,
     idx: PropTypes.number,
     activeIdx: PropTypes.number,
     onClick: PropTypes.func,
};

export default CardDashboard;
