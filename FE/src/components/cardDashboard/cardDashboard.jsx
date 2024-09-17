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

     const fetchTrendData = async () => {
          try {
               const response = await axios.get(`https://backend-agustrisa.as1.pitunnel.net/api/trend?type=${titleCard.toLowerCase()}&period=now`);
               if (response.status == 200) {
                    setTrendData(response.data)
               }
          } catch (error) {
               console.log(error);
          }
     }

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
                    <p className="mr-1">Grad =
                         <span className={`${trendData?.trendStatus === 'naik' ? 'text-green-600' : trendData?.trendStatus === 'stabil' ? 'text-green-600' : trendData?.trendStatus === 'turun' ? 'text-red-600' : 'text-green-600'}`}>
                              {trendData?.trendStatus === 'naik' ? '+' : trendData?.trendStatus === 'stabil' ? '' : trendData?.trendStatus === 'turun' ? '' : ''}
                              {trendData?.gradient ? Number(trendData.gradient).toFixed(3) : ''}
                         </span>
                    </p>
                    {trendData?.trendStatus === 'naik' ? <img src={ArrowUp} alt="gradient" /> : trendData?.trendStatus === 'turun' ? <img src={ArrowDown} alt="gradient" /> : <img src={ArrowUp} alt="gradient" />}
               </div>
               <div className={`flex justify-center items-end font-bold ${aturUkuran(dataCard).fontSize}`}>
                    <p className={`${titleCard === 'Dryness' || titleCard === 'Power' ? 'text-2xl md:text-[64px]' : 'text-2xl md:text-[40px]'}`}>{aturUkuran(dataCard).value}</p>
                    <small className={`${titleCard === 'Dryness' || titleCard === 'Power' ? 'text-base md:text-3xl relative md:top-3' : 'text-base md:text-2xl relative md:top-1' }`}>{symbolDesicion()}</small>
               </div>
               <p className={` font-bold ${titleCard === 'Dryness' || titleCard === 'Power' ? 'text-lg md:text-[28px]' : 'text-lg md:text-[28px]'}`}>
                    {titleCard  === 'Dryness' ? 'Dryness Fraction' : titleCard  === 'Power' ?  'Power Prediction' : titleCard}
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
