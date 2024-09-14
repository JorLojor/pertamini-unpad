import PropTypes from "prop-types";
import { useState } from "react";

const AnaliticCardSmall = ({
     titleCard,
     now,
     daily,
     monthly,
     yearly,
     onClick,
}) => {
     const [activeIdx, setActiveIdx] = useState(null);

     const formatNumber = (number) => {
          if (number.toString().length > 5) {
               return {
                    value: Number(number).toFixed(3),
                    fontSize: "text-lg",
               };
          }
          return {
               value: number,
               fontSize: "text-xl",
          };
     };

     const symbolDesicion = (titleCard) => {
          const symbols = {
               Dryness: "%",
               Suhu: "°C",
               Tekanan: "BarG",
               Flow: "Ton/h",
               Daya: "Mh",
          };
          return symbols[titleCard] || "";
     };

     const handleCardClick = (index, data) => {
          setActiveIdx(index);
          onClick(data);
     };

     return (
          <div className="flex gap-9 w-fit">
               <div
                    className={`flex flex-col items-center shadow rounded-md ${
                         activeIdx === 0 ? "bg-blue-900 text-white" : "bg-white"
                    }`}
                    onClick={() =>
                         handleCardClick(0, {
                              sensor: titleCard,
                              rule: "min",
                         })
                    }
                    style={{
                         width: "325px",
                         height: "180px",
                    }}>
                    <div
                         className="flex flex-row items-center justify-between gap-4 w-full px-6 pt-7 pb-2"
                         style={{
                              borderBottom: "1px solid #A6A6A6",
                         }}>
                         <p className="text-2xl font-bold">Min Now</p>
                         <p
                              className={`text-2xl font-semibold ${
                                   formatNumber(now.minNow).fontSize
                              }`}>
                              {formatNumber(now.minNow).value}{" "}
                              {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(daily.minDaily).fontSize
                                   }`}>
                                   {formatNumber(daily.minDaily).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Bulanan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(monthly.minMonthly)
                                             .fontSize
                                   }`}>
                                   {formatNumber(monthly.minMonthly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(yearly.minYearly).fontSize
                                   }`}>
                                   {formatNumber(yearly.minYearly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                    </div>
               </div>

               {/* Max Values */}
               <div
                    className={`flex flex-col items-center shadow rounded-md ${
                         activeIdx === 1 ? "bg-blue-900 text-white" : "bg-white"
                    }`}
                    onClick={() =>
                         handleCardClick(1, {
                              sensor: titleCard,
                              rule: "max",
                         })
                    }
                    style={{
                         width: "325px",
                         height: "180px",
                    }}>
                    <div
                         className="flex flex-row items-center justify-between gap-4 w-full px-6 pt-7 pb-2"
                         style={{
                              borderBottom: "1px solid #A6A6A6",
                         }}>
                         <p className="text-2xl font-bold">Max Now</p>
                         <p
                              className={`text-2xl font-semibold ${
                                   formatNumber(now.maxNow).fontSize
                              }`}>
                              {formatNumber(now.maxNow).value}{" "}
                              {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(daily.maxDaily).fontSize
                                   }`}>
                                   {formatNumber(daily.maxDaily).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middl">
                              <p>Bulanan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(monthly.maxMonthly)
                                             .fontSize
                                   }`}>
                                   {formatNumber(monthly.maxMonthly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(yearly.maxYearly).fontSize
                                   }`}>
                                   {formatNumber(yearly.maxYearly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                    </div>
               </div>

               {/* Avg Values */}
               <div
                    className={`flex flex-col items-center shadow rounded-md ${
                         activeIdx === 2 ? "bg-blue-900 text-white" : "bg-white"
                    }`}
                    onClick={() =>
                         handleCardClick(2, {
                              sensor: titleCard,
                              rule: "avg",
                         })
                    }
                    style={{
                         width: "325px",
                         height: "180px",
                    }}>
                    <div
                         className="flex flex-row items-center justify-between gap-4 w-full px-6 pt-7 pb-2"
                         style={{
                              borderBottom: "1px solid #A6A6A6",
                         }}>
                         <p className="text-2xl font-bold">Average Now</p>
                         <p
                              className={`text-2xl font-semibold ${
                                   formatNumber(now.avgNow).fontSize
                              }`}>
                              {formatNumber(now.avgNow).value}{" "}
                              {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(daily.avgDaily).fontSize
                                   }`}>
                                   {formatNumber(daily.avgDaily).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Bulanan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(monthly.avgMonthly)
                                             .fontSize
                                   }`}>
                                   {formatNumber(monthly.avgMonthly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(yearly.avgYearly).fontSize
                                   }`}>
                                   {formatNumber(yearly.avgYearly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                    </div>
               </div>

               {/* StdDev Values */}
               <div
                    className={`flex flex-col items-center shadow rounded-md ${
                         activeIdx === 3 ? "bg-blue-900 text-white" : "bg-white"
                    }`}
                    onClick={() =>
                         handleCardClick(3, {
                              sensor: titleCard,
                              rule: "stddev",
                         })
                    }
                    style={{
                         width: "325px",
                         height: "180px",
                    }}>
                    <div
                         className="flex flex-row items-center justify-between gap-4 w-full px-6 pt-7 pb-2"
                         style={{
                              borderBottom: "1px solid #A6A6A6",
                         }}>
                         <p className="text-2xl font-bold">StdDev Now</p>
                         <p
                              className={`text-2xl font-semibold ${
                                   formatNumber(now.stddevNow).fontSize
                              }`}>
                              {formatNumber(now.stddevNow).value}{" "}
                              {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(daily.stddevDaily).fontSize
                                   }`}>
                                   {formatNumber(daily.stddevDaily).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Bulanan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(monthly.stddevMonthly)
                                             .fontSize
                                   }`}>
                                   {formatNumber(monthly.stddevMonthly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p
                                   className={`font-bold pt-2 ${
                                        formatNumber(yearly.stddevYearly)
                                             .fontSize
                                   }`}>
                                   {formatNumber(yearly.stddevYearly).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

AnaliticCardSmall.propTypes = {
     now: PropTypes.object.isRequired,
     daily: PropTypes.object.isRequired,
     monthly: PropTypes.object.isRequired,
     yearly: PropTypes.object.isRequired,
     titleCard: PropTypes.string.isRequired,
     onClick: PropTypes.func.isRequired,
};

export default AnaliticCardSmall;
