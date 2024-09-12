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
               return "BarG";
          }
          if (titleCard === "Flow") {
               return "Ton/h";
          }
          if (titleCard === "Daya") {
               return "Mh";
          }
     };

     const aturUkuran = (dataCard) => {
          console.log(typeof dataCard); //number
          if (!dataCard) {
               return "text-5xl";
          }
          const dataString = dataCard.toString();
          console.log(typeof dataString); //string

          //   potong string jadi 5 karakter pertama 1.139293929323 jadi 1.139
          if (dataString.length > 5) {
               //   potong string jadi 5 karakter pertama 1.139293929323 jadi 1.139
               const potongAjg = dataString.slice(0, 5);
               return potongAjg;
          }
     };

     return (
          <div
               onClick={() => onClick(idx)}
               className={`mt-3 w-72 col-span-1 shadow-md rounded-lg cursor-pointer transition-colors duration-300 
            ${
                 activeIdx === idx
                      ? "bg-blue-950 text-white"
                      : "bg-white text-green-950"
            }`}>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className="text-2xl font-bold text-[22px]">
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
                              className="w-6 h-6x ml-2"
                         />
                    </p>
               </div>
               <div className="flex flex-row justify-between items-center p-4 w-full">
                    <p className="flex-row font-bold  text-5xl">
                         {aturUkuran(dataCard)}
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
          </div>
     );
};

AnaliticCardBig.propTypes = {
     titleCard: PropTypes.string,
     dataCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     trendData: PropTypes.string,
     idx: PropTypes.number,
     activeIdx: PropTypes.number,
     onClick: PropTypes.func,
};

export default AnaliticCardBig;
