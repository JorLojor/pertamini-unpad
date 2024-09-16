import PropTypes from "prop-types";
import { useState } from "react";

const AnaliticCardSmall = ({
    titleCard,
    now,
    daily,
    monthly,
    yearly,
    onClick,
    selectedPeriod, // Accept the selected period as a prop
}) => {
    const [activeIdx, setActiveIdx] = useState(null);

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

    return (
        <div className="">
            <div className="flex flex-col items-start">
                <div className="flex flex-wrap w-full">
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
                        <p className={`text-2xl font-extrabold p-2 px-4 mt-2 mb-4 ${activeIdx === 0 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' }  border rounded-lg ${formatNumber(now.minNow).fontSize}`} >
                            {formatNumber(now.minNow).value}{" "}
                            {symbolDesicion(titleCard)}
                        </p>
                        <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t ">
                            <div className="align-middle">
                                <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                <p className={`font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 0 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg  ${formatNumber(selectedPeriod === 'harian' ? daily.minDaily : selectedPeriod === 'bulanan' ? monthly.minMonthly : yearly.minYearly).fontSize}`} >
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
                        <p className={`text-2xl font-extrabold p-2 px-4 mt-2 mb-4 ${activeIdx === 1 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg ${formatNumber(now.maxNow).fontSize}`} >
                            {formatNumber(now.maxNow).value}{" "}
                            {symbolDesicion(titleCard)}
                        </p>
                        <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                            <div className="align-middle">
                                <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                <p className={`font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 1 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg ${formatNumber(selectedPeriod === 'harian' ? daily.maxDaily : selectedPeriod === 'bulanan' ? monthly.maxMonthly : yearly.maxYearly).fontSize}`} >
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
                        <p className={`text-2xl font-extrabold p-2 px-4 mt-2 mb-4 ${activeIdx === 2 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg ${formatNumber(now.avgNow).fontSize}`}>
                            {formatNumber(now.avgNow).value}{" "}
                            {symbolDesicion(titleCard)}
                        </p>
                        <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                            <div className="align-middle">
                                <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                <p className={`font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 2 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg ${formatNumber(selectedPeriod === 'harian' ? daily.avgDaily : selectedPeriod === 'bulanan' ? monthly.avgMonthly : yearly.avgYearly).fontSize}`}>
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
                        <p className={`text-2xl font-extrabold p-2 px-4 mt-2 mb-4 ${activeIdx === 3 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg ${formatNumber(now.stddevNow).fontSize}`} >
                            {formatNumber(now.stddevNow).value}{" "}
                            {symbolDesicion(titleCard)}
                        </p>
                        <div className="flex justify-center w-full px-6 pt-2 pb-2 border-t">
                            <div className="align-middle">
                                <p>{selectedPeriod === 'harian' ? "Harian" : selectedPeriod === 'bulanan' ? "Bulanan" : "Tahunan"}</p>
                                <p className={`font-bold p-2 px-4 mt-2 mb-6 ${activeIdx === 3 ? 'bg-black bg-opacity-10 border-[#BFBFBF]' : 'bg-[#F7F7F7] border-[#BFBFBF]' } border rounded-lg ${formatNumber(selectedPeriod === 'harian' ? daily.stddevDaily : selectedPeriod === 'bulanan' ? monthly.stddevMonthly : yearly.stddevYearly).fontSize}`} >
                                    {formatNumber(selectedPeriod === 'harian' ? daily.stddevDaily : selectedPeriod === 'bulanan' ? monthly.stddevMonthly : yearly.stddevYearly).value}{" "}
                                    {symbolDesicion(titleCard)}
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
    selectedPeriod: PropTypes.string.isRequired, // Add prop type for selectedPeriod
};

export default AnaliticCardSmall;
