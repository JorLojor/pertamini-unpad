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

const CardDashboard = ({
     titleCard,
     dataCard,
     trendData,
     idx,
     activeIdx,
     onClick,
}) => {
     const colorSymbolDesicion = (trendData) => {
          if (trendData < 99.5 || trendData > 100.0) {
               return ["text-red-500", ArrowDown, trendData];
          } else {
               return ["text-green-500", ArrowUp, trendData];
          }
     };

     const titleDesicion = () => {
          if (titleCard === "Dryness") {
               return [DrynessIcon, DrynessIconWhite];
          }
          if (titleCard === "Suhu") {
               return [SuhuIcon, SuhuIconWhite];
          }
          if (titleCard === "Tekanan") {
               return [TekananIcon, TekananIconWhite];
          }
          if (titleCard === "Flow") {
               return [FlowIcon, FlowIconWhite];
          }
          if (titleCard === "Daya") {
               return [DayaIcon, DayaIconWhite];
          }
     };

     const symbolDesicion = () => {
          if (titleCard === "Dryness") {
               return "%";
          }
          if (titleCard === "Suhu") {
               return "°C";
          }
          if (titleCard === "Tekanan") {
               return "barg";
          }
          if (titleCard === "Flow") {
               return "ton/h";
          }
          if (titleCard === "Daya") {
               return "Mh";
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

     return (
          <div
               onClick={() => onClick(idx)}
               className={`mt-3 ${titleCard === 'Dryness' || titleCard === 'Daya' ?  'w-[450px] h-[200px]' : 'w-[325px]' } col-span-1 shadow-md rounded-lg cursor-pointer transition-colors duration-300 
            ${
                 activeIdx === idx
                      ? "bg-blue-950 text-white"
                      : "bg-white text-green-950"
            }`}>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className={` font-bold ${titleCard === 'Dryness' || titleCard === 'Daya' ? 'text-4xl' : 'text-[22px]'}`}>
                         {titleCard}
                    </p>
                    <p
                         className={`text-xl font-bold flex items-center ${
                              colorSymbolDesicion(trendData)[0]
                         }`}>
                         {colorSymbolDesicion(trendData)[2]}
                         <img
                              src={colorSymbolDesicion(trendData)[1]}
                              alt="Trend Icon"
                              className={` ${titleCard === 'Dryness' || titleCard === 'Daya' ? 'w-10 h-10' : 'w-6 h-6'} ml-2`}
                         />
                    </p>
               </div>
               <div className={`flex flex-row justify-between items-center p-4 w-full ${titleCard === 'Dryness' || titleCard === 'Daya' ? 'mt-8' : 'mt-0'}`}>
                    <div
                         className={`flex items-end font-bold ${
                              aturUkuran(dataCard).fontSize
                         }`}>
                         <p className={`${titleCard === 'Dryness' || titleCard === 'Daya' ? 'text-5xl' : 'text-3xl'}`}>{aturUkuran(dataCard).value}</p>
                         <small className="text-base">{symbolDesicion()}</small>
                    </div>
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
