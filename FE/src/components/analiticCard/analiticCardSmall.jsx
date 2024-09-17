import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const AnaliticCardSmall = ({
     titleCard,
     now,
     daily,
     monthly,
     yearly,
     onClick,
     selectedPeriod,
}) => {
     const [activeIdx, setActiveIdx] = useState(null);
     const [narasiNow, setNarasiNow] = useState(null);
     const [narasi, setNarasi] = useState(null);
     const [anomaliNow, setAnomaliNow] = useState(null);
     const [anomali, setAnomali] = useState(null);

     const fetchNarasi = async () => {
          try {
               const response = await axios.get(`https://backend-agustrisa.as1.pitunnel.net/api/trend?type=${titleCard.toLowerCase()}&period=${selectedPeriod === 'harian' ? 'daily' : selectedPeriod === 'bulanan' ? 'monthly' : selectedPeriod === 'tahunan' ? 'yearly' : 'now'}`);
               const responseNow = await axios.get(`https://backend-agustrisa.as1.pitunnel.net/api/trend?type=${titleCard.toLowerCase()}&period=now`);
               if (response.status === 200) {
                    setNarasi(response.data);
               }
               if (responseNow.status === 200) {
                    setNarasiNow(responseNow.data);
               }
          } catch (error) {
               console.log(error);
          }
     };

     const fetchAnomali = async () => {
          try {
               const response = await axios.get(`https://backend-agustrisa.as1.pitunnel.net/api/outOfLimit?type=${titleCard.toLowerCase()}&period=${selectedPeriod === 'harian' ? 'daily' : selectedPeriod === 'bulanan' ? 'monthly' : selectedPeriod === 'tahunan' ? 'yearly' : 'now'}`);
               const responseNow = await axios.get(`https://backend-agustrisa.as1.pitunnel.net/api/outOfLimit?type=${titleCard.toLowerCase()}&period=daily`);
               
               if (response.status === 200) {
                    setAnomali(response.data);
               }
               if (responseNow.status === 200) {
                    setAnomaliNow(responseNow.data);
               }
          } catch (error) {
               console.log(error);
          }
     };

     const formatNumber = (number) => {
          if (number?.toString().length > 5) {
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
               Temperature: "°C",
               Pressure: "barg",
               Flow: "ton/h",
               Power: "MW",
          };
          return symbols[titleCard] || "";
     };

     const handleCardClick = (index, data) => {
          setActiveIdx(index);
          onClick(data);
     };

     useEffect(() => {
          fetchNarasi();
          fetchAnomali();
     }, [selectedPeriod]);



     return (
          <div className="">
               <div className="flex flex-col items-start ">
                    <div className="flex flex-wrap w-full justify-center md:justify-start max-w-[800px]">
                         {/* Min Values */}
                         <div
                              className={`flex flex-col w-[230px] items-center shadow rounded-md m-1 ${activeIdx === 0 ? "bg-[#262937] text-white" : "bg-white"}`}
                              onClick={() =>
                                   handleCardClick(0, {
                                        sensor: titleCard,
                                        rule: "min",
                                   })
                              }
                         >
                              <p className="text-[22px] pt-6">Min Now</p>
                              <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-4 ${activeIdx === 0 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'}  border rounded-lg ${formatNumber(now.minNow).fontSize}`} >
                                   {formatNumber(now.minNow).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                              <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t ">
                                   <div className="align-middle">
                                        <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                        <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 0 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg  ${formatNumber(selectedPeriod === 'harian' ? daily.minDaily : selectedPeriod === 'bulanan' ? monthly.minMonthly : yearly.minYearly).fontSize}`} >
                                             {formatNumber(selectedPeriod === 'harian' ? daily.minDaily : selectedPeriod === 'bulanan' ? monthly.minMonthly : yearly.minYearly).value}{" "}
                                             {symbolDesicion(titleCard)}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Max Values */}
                         <div
                              className={`flex flex-col w-[230px] items-center shadow rounded-md m-1 ${activeIdx === 1 ? "bg-[#262937] text-white" : "bg-white"}`}
                              onClick={() =>
                                   handleCardClick(1, {
                                        sensor: titleCard,
                                        rule: "max",
                                   })
                              }
                         >
                              <p className="text-[22px] pt-6">Max Now</p>
                              <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-4 ${activeIdx === 1 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg ${formatNumber(now.maxNow).fontSize}`} >
                                   {formatNumber(now.maxNow).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                              <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                                   <div className="align-middle">
                                        <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                        <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 1 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg ${formatNumber(selectedPeriod === 'harian' ? daily.maxDaily : selectedPeriod === 'bulanan' ? monthly.maxMonthly : yearly.maxYearly).fontSize}`} >
                                             {formatNumber(selectedPeriod === 'harian' ? daily.maxDaily : selectedPeriod === 'bulanan' ? monthly.maxMonthly : yearly.maxYearly).value}{" "}
                                             {symbolDesicion(titleCard)}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Avg Values */}
                         <div
                              className={`flex flex-col w-[230px] items-center shadow rounded-md m-1 ${activeIdx === 2 ? "bg-[#262937] text-white" : "bg-white"}`}
                              onClick={() =>
                                   handleCardClick(2, {
                                        sensor: titleCard,
                                        rule: "avg",
                                   })
                              }
                         >
                              <p className="text-[22px] pt-6">Average Now</p>
                              <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-4 ${activeIdx === 2 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg ${formatNumber(now.avgNow).fontSize}`}>
                                   {formatNumber(now.avgNow).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                              <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                                   <div className="align-middle">
                                        <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                        <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 2 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg ${formatNumber(selectedPeriod === 'harian' ? daily.avgDaily : selectedPeriod === 'bulanan' ? monthly.avgMonthly : yearly.avgYearly).fontSize}`}>
                                             {formatNumber(selectedPeriod === 'harian' ? daily.avgDaily : selectedPeriod === 'bulanan' ? monthly.avgMonthly : yearly.avgYearly).value}{" "}
                                             {symbolDesicion(titleCard)}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* StdDev Values */}
                         <div
                              className={`flex flex-col w-[230px] items-center shadow rounded-md m-1 ${activeIdx === 3 ? "bg-[#262937] text-white" : "bg-white"}`}
                              onClick={() =>
                                   handleCardClick(3, {
                                        sensor: titleCard,
                                        rule: "stddev",
                                   })
                              }
                         >
                              <p className="text-[22px] pt-6">Standar Deviasi</p>
                              <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-4 ${activeIdx === 3 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg ${formatNumber(now.stddevNow).fontSize}`} >
                                   {formatNumber(now.stddevNow).value}{" "}
                                   {symbolDesicion(titleCard)}
                              </p>
                              <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                                   <div className="align-middle">
                                        <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                        <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 3 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg ${formatNumber(selectedPeriod === 'harian' ? daily.stddevDaily : selectedPeriod === 'bulanan' ? monthly.stddevMonthly : yearly.stddevYearly).fontSize}`} >
                                             {formatNumber(selectedPeriod === 'harian' ? daily.stddevDaily : selectedPeriod === 'bulanan' ? monthly.stddevMonthly : yearly.stddevYearly).value}{" "}
                                             {symbolDesicion(titleCard)}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Narasi Values */}
                         <div className={`flex flex-col w-[230px] items-center shadow rounded-md m-1 ${activeIdx === 4 ? "bg-[#262937] text-white" : "bg-white"}`}>
                              <p className="text-[22px] pt-6">Narasi Now</p>
                              <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-4 ${activeIdx === 4 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg`}>
                                   {narasiNow?.trendStatus.toUpperCase()}
                              </p>
                              <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                                   <div className="align-middle">
                                        <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                        <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 4 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg`}>
                                             {narasi?.trendStatus.toUpperCase()}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Anomali Values */}
                         <div className={`flex flex-col w-[230px] items-center shadow rounded-md m-1 ${activeIdx === 4 ? "bg-[#262937] text-white" : "bg-white"}`}>
                              <p className="text-[22px] pt-6">Anomali Now</p>
                              <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-4 ${activeIdx === 4 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg`}>
                                   {anomaliNow?.count * 60}
                              </p>
                              <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                                   <div className="align-middle">
                                        <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                        <p className={`text-2xl font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 4 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]'} border rounded-lg`}>
                                             {anomali?.count * 60}
                                        </p>
                                   </div>
                              </div>
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
     selectedPeriod: PropTypes.string.isRequired,
};

export default AnaliticCardSmall;
