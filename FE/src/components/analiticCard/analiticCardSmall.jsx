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
     const [activeIdx, setActiveIdx] = useState(null); // Track active card

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
          setActiveIdx(index); // Set active card index
          onClick(data); // Pass selected data back to parent
     };

     return (
          <div className="flex gap-9 w-fit">
               {/* Min Values */}
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
                         <p className="text-2xl font-semibold">
                              {now.minNow} {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p className="text-xl font-bold pt-2">
                                   {daily.min} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Bulanan</p>
                              <p className="text-xl font-bold pt-2">
                                   {monthly.min} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p className="text-xl font-bold pt-2">
                                   {yearly.min} {symbolDesicion(titleCard)}
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
                         <p className="text-2xl font-semibold">
                              {now.maxNow} {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p className="text-xl font-bold pt-2">
                                   {daily.max} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middl">
                              <p>Bulanan</p>
                              <p className="text-xl font-bold pt-2">
                                   {monthly.max} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p className="text-xl font-bold pt-2">
                                   {yearly.max} {symbolDesicion(titleCard)}
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
                         <p className="text-2xl font-semibold">
                              {now.avgNow} {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p className="text-xl font-bold pt-2">
                                   {daily.avg} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Bulanan</p>
                              <p className="text-xl font-bold pt-2">
                                   {monthly.avg} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p className="text-xl font-bold pt-2">
                                   {yearly.avg} {symbolDesicion(titleCard)}
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
                         <p className="text-2xl font-semibold">
                              {now.stddevNow} {symbolDesicion(titleCard)}
                         </p>
                    </div>
                    <div className="flex justify-between w-full  px-6 pt-7 pb-2">
                         <div className="align-middle">
                              <p>Harian</p>
                              <p className="text-xl font-bold pt-2">
                                   {daily.stddev} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Bulanan</p>
                              <p className="text-xl font-bold pt-2">
                                   {monthly.stddev} {symbolDesicion(titleCard)}
                              </p>
                         </div>
                         <div className="align-middle">
                              <p>Tahunan</p>
                              <p className="text-xl font-bold pt-2">
                                   {yearly.stddev} {symbolDesicion(titleCard)}
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
     onClick: PropTypes.func.isRequired, //Pass click event handler
};

export default AnaliticCardSmall;
