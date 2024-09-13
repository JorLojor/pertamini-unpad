import PropTypes from "prop-types";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowDown from "../../assets/ArrowDown.svg";
import DrynessIcon from "../../assets/DrynessIcon.svg";
import DrynessIconWhite from "../../assets/DrynessIconWhite.svg";
import SuhuIconWhite from "../../assets/SuhuIconWhite.svg";
import SuhuIcon from "../../assets/SuhuIcon.svg";
import TekananIcon from "../../assets/TekananIcon.svg";
import TekananIconWhite from "../../assets/TekananIconWhite.svg";
import FlowIcon from "../../assets/FlowIcon.svg";
import FlowIconWhite from "../../assets/FlowIconWhite.svg";
import DayaIcon from "../../assets/DayaIcon.svg";
import DayaIconWhite from "../../assets/DayaIconWhite.svg";

const AnaliticCardBig = ({
     titleCard,
     dataCard,
     trendData,
     idx,
     activeIdx,
     onClick,
     dataStatus,
}) => {
     const colorSymbolDesicion = (trendData) => {
          return trendData < 99.5 || trendData > 100.0
               ? ["text-red-500", ArrowDown, trendData]
               : ["text-green-500", ArrowUp, trendData];
     };

     const titleDesicion = () => {
          const titles = {
               Dryness: [DrynessIcon, DrynessIconWhite],
               Suhu: [SuhuIcon, SuhuIconWhite],
               Tekanan: [TekananIcon, TekananIconWhite],
               Flow: [FlowIcon, FlowIconWhite],
               Daya: [DayaIcon, DayaIconWhite],
          };
          return titles[titleCard] || [FlowIcon, FlowIconWhite]; // Default to Flow icons
     };

     const symbolDesicion = () => {
          const symbols = {
               Dryness: "%",
               Suhu: "°C",
               Tekanan: "BarG",
               Flow: "Ton/h",
               Daya: "Mh",
          };
          return symbols[titleCard] || "";
     };

     console.log(dataCard.data);
     // const formatData = (dataCard) => {
     //      return dataCard.length > 5 ? dataCard.slice(0, 5) : dataCard;
     // };

     return (
          <div
               onClick={() => onClick(idx)}
               className={`mt-3 w-72 col-span-1 shadow-md rounded-lg cursor-pointer transition-colors duration-300 ${
                    activeIdx === idx
                         ? "bg-blue-950 text-white"
                         : "bg-white text-green-950"
               }`}>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className="text-2xl font-bold">{titleCard}</p>
                    <p
                         className={`text-xl font-bold flex items-center ${
                              colorSymbolDesicion(trendData)[0]
                         }`}>
                         {colorSymbolDesicion(trendData)[2]}
                         <img
                              src={colorSymbolDesicion(trendData)[1]}
                              alt="Trend Icon"
                              className="w-6 h-6 ml-2"
                         />
                    </p>
               </div>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className="text-5xl font-bold">
                         {formatData(dataCard)}
                         <small className="text-3xl">{symbolDesicion()}</small>
                    </p>
                    <img
                         src={
                              activeIdx === idx
                                   ? titleDesicion()[1]
                                   : titleDesicion()[0]
                         }
                         alt="Icon"
                         className="w-9 h-9 ml-2"
                    />
               </div>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p>Status Sensor</p>
                    <p
                         className={
                              dataStatus === 1
                                   ? "text-green-500"
                                   : "text-red-500"
                         }>
                         {dataStatus === 1 ? "ON" : "OFF"}
                    </p>
               </div>
          </div>
     );
};

AnaliticCardBig.propTypes = {
     titleCard: PropTypes.string.isRequired,
     dataCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
     trendData: PropTypes.string.isRequired,
     idx: PropTypes.number.isRequired,
     activeIdx: PropTypes.number.isRequired,
     onClick: PropTypes.func.isRequired,
     dataStatus: PropTypes.number.isRequired,
};

export default AnaliticCardBig;
