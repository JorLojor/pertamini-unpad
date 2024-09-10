import { useState } from "react";
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
import PropTypes from "prop-types";

const CardDashboard = ({ titleCard, dataCard, trendData }) => {
     const [clicked, setClicked] = useState(false);

     const handleClick = () => {
          setClicked(!clicked);
     };

     const colorSymbolDesicion = (trendData) => {
          if (trendData < 99.5 || trendData > 100.0) {
               return ["text-red-500", ArrowDown, trendData];
          } else {
               return ["text-green-500", ArrowUp, trendData];
          }
     };

     const titleDesicion = () => {
          if (titleCard === "dryness") {
               return [DrynessIcon, DrynessIconWhite];
          }
          if (titleCard === "suhu") {
               return [SuhuIcon, SuhuIconWhite];
          }
          if (titleCard === "tekanan") {
               return [TekananIcon, TekananIconWhite];
          }
          if (titleCard === "flow") {
               return [FlowIcon, FlowIconWhite];
          }
          if (titleCard === "daya") {
               return [DayaIcon, DayaIconWhite];
          }
     };

     const symbolDesicion = () => {
          if (titleCard === "dryness") {
               return "%";
          }
          if (titleCard === "suhu") {
               return "°C";
          }
          if (titleCard === "tekanan") {
               return "BarG";
          }
          if (titleCard === "flow") {
               return "Ton/h";
          }
          if (titleCard === "daya") {
               return "Mh";
          }
     };

     const aturUkuran = (dataCard) => {
          if (!dataCard) {
               return "text-5xl";
          }
          const dataString = dataCard.toString();
          if (dataString.length > 5) {
               return "text-4xl";
          } else if (dataString.length > 7) {
               return "text-2xl";
          } else {
               return "text-5xl";
          }
     };

     return (
          <div
               onClick={handleClick}
               className={`w-72 col-span-1 shadow-md rounded-lg cursor-pointer transition-colors duration-300 
            ${clicked ? "bg-blue-950 text-white" : "bg-white text-green-950"}`}>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className="text-2xl font-bold ">{titleCard}</p>
                    <p
                         className={`text-xl font-bold flex items-center ${
                              colorSymbolDesicion(trendData)[0]
                         }`}>
                         {colorSymbolDesicion(trendData)[2]}
                         <img
                              src={colorSymbolDesicion(trendData)[1]}
                              alt="Trend Icon"
                              className="w-6 h-6x ml-2"
                         />
                    </p>
               </div>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className={`flex-row font-bold ${aturUkuran(dataCard)}`}>
                         {dataCard}
                         <small className="text-3xl">{symbolDesicion()}</small>
                    </p>
                    <img
                         src={clicked ? titleDesicion()[1] : titleDesicion()[0]}
                         alt="Dryness Icon"
                         className="w-9 h-9 ml-2"
                    />
               </div>
          </div>
     );
};

CardDashboard.propTypes = {
     titleCard: PropTypes.string,
     dataCard: PropTypes.string,
     trendData: PropTypes.string,
};

export default CardDashboard;
