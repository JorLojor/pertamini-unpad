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
               Suhu: [SuhuIcon, SuhuIconWhite],
               Tekanan: [TekananIcon, TekananIconWhite],
               Flow: [FlowIcon, FlowIconWhite],
               Daya: [DayaIcon, DayaIconWhite],
          };
          return titles[titleCard] || [FlowIcon, FlowIconWhite];
     };

     const symbolDecision = () => {
          const symbols = {
               Dryness: "%",
               Suhu: "°C",
               Tekanan: "BarG",
               Flow: "Ton/h",
               Daya: "Mh",
          };
          return symbols[titleCard] || "";
     };

     const formatData = (dataCard) => {
          const data =
               typeof dataCard === "number" ? dataCard.toFixed(2) : dataCard;
          return data && data.length > 5 ? data.slice(0, 5) : data;
     };

     return (
          <div
               onClick={() => onClick()}
               className="w-[525px] p-4 h-auto bg-white rounded-lg shadow-lg m-2">
               <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-semibold">{titleCard}</p>
                    <img
                         src={titleDecision()[0]}
                         alt="Icon"
                         className="w-8 h-8"
                    />
               </div>
               <div className="flex items-center mb-4">
                    <p className="text-5xl font-bold mr-4">
                         {formatData(dataCard) || "N/A"}{" "}
                         <small className="text-2xl">{symbolDecision()}</small>
                    </p>
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
               <div className="flex justify-between items-center">
                    <p>Status Sensor</p>
                    <p className={dataStatus === 1 ? "text-green-500" : "text-red-500"}>
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
     onClick: PropTypes.func.isRequired,
     dataStatus: PropTypes.number.isRequired,
};

export default AnaliticCardBig;
