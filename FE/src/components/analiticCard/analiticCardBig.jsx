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

const AnaliticCardBig = ({
     titleCard,
     dataCard,
     trendData,
     onClick,
     dataStatus,
}) => {
     const colorSymbolDecision = (trendData) => {
          return trendData < 99.5 || trendData > 100.0
               ? ["text-red-500", ArrowDown, trendData]
               : ["text-green-500", ArrowUp, trendData];
     };

     const titleDecision = () => {
          const titles = {
               Dryness: [DrynessIcon, DrynessIconWhite],
               Temperature: [TemperatureIcon, TemperatureIconWhite],
               Pressure: [PressureIcon, PressureIconWhite],
               Flow: [FlowIcon, FlowIconWhite],
               Power: [PowerIcon, PowerIconWhite],
          };
          return titles[titleCard] || [FlowIcon, FlowIconWhite];
     };

     const symbolDecision = () => {
          const symbols = {
               Dryness: "%",
               Temperature: "°C",
               Pressure: "BarG",
               Flow: "Ton/h",
               Power: "Mh",
          };
          return symbols[titleCard] || "";
     };

     const formatData = (dataCard) => {
          const data = typeof dataCard === "number" ? dataCard.toFixed(2) : dataCard;
          return data && data?.length > 5 ? data?.slice(0, 5) : data;
     };

     return (
          <div className="">
               <div
                    onClick={() => onClick()}
                    className="w-[300px] p-4 h-auto bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-4">
                         <p>Dev = </p>
                         <p
                              className={`flex items-center ${colorSymbolDecision(trendData)[0]
                                   } text-2xl`}>
                              {colorSymbolDecision(trendData)[2]}%
                              <img
                                   src={colorSymbolDecision(trendData)[1]}
                                   alt="Trend Icon"
                                   className="w-5 h-5 ml-2"
                              />
                         </p>
                    </div>
                    <p className="text-5xl font-bold mr-4">
                         {formatData(dataCard) || "N/A"}{" "}
                         <small className="text-2xl">{symbolDecision()}</small>
                    </p>
                    <p className="text-xl font-semibold">{titleCard}</p>

               </div>
               <div className="bg-white rounded-lg w-[300px] h-[150px] mx-auto mt-4 shadow-md flex flex-col justify-center items-center">
                    <p className="text-center text-[22px] font-bold">Status Sensor</p>
                    <p className={`${dataStatus === 1 ? "text-green-500" : "text-red-500 text-center"} text-[48px] font-bold`}>
                         {dataStatus === 1 ? "ON" : "OFF"}
                    </p>
               </div>
          </div>
     );
};

AnaliticCardBig.propTypes = {
     titleCard: PropTypes.string.isRequired,
     dataCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
     trendData: PropTypes.string.isRequired,
     onClick: PropTypes.func.isRequired,
     dataStatus: PropTypes.number.isRequired,
};

export default AnaliticCardBig;
