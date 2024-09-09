import { useState } from "react";
import ArrowUp from "../../assets/ArrowUp.svg";
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

const CardDashboard = ({ titleCard, dataCard }) => {
     const [clicked, setClicked] = useState(false);

     const handleClick = () => {
          setClicked(!clicked);
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

     const aturUkuran = (dataCard) => {
          if (!dataCard) {
               return "text-5xl"; // Default size if dataCard is undefined or null
          }
          const dataString = dataCard.toString();
          if (dataString.length > 5) {
               return "text-4xl";
          } else {
               return "text-5xl";
          }
     };

     return (
          <div
               onClick={handleClick}
               className={`w-72 col-span-1 shadow-md rounded-lg cursor-pointer transition-colors duration-300 
            ${clicked ? "bg-blue-950 text-white" : "bg-white text-black"}`}>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className="text-2xl font-bold ">{titleCard}</p>
                    <p className="text-xl font-bold flex items-center">
                         +10%
                         <img
                              src={ArrowUp}
                              alt="Arrow Up"
                              className="w-6 h-6x ml-2"
                         />
                    </p>
               </div>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className={` font-bold ${aturUkuran(dataCard)}`}>
                         {dataCard}%
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
};

export default CardDashboard;
