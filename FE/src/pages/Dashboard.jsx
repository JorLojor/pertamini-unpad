import { useState, useEffect } from "react";
import CardDashboard from "../components/cardDashboard/CardDashboard";
import LineChart from "../components/lineCart/LineCart";
import TableData from "../components/table/TableData";

const Dashboard = () => {
     const [dataCard, setDataCard] = useState({});
     const [activeIdx, setActiveIdx] = useState(null);
     const [chartData, setChartData] = useState([]);
     const [loading, setLoading] = useState(false);
     const [startDate, setStartDate] = useState("");
     const [endDate, setEndDate] = useState("");
     const [selectedType, setSelectedType] = useState("dryness");
     const [selectedTitle, setSelectedTitle] = useState("Chart Data");

     const fetchChartData = async (type) => {
          try {
               setLoading(true);
               const params = new URLSearchParams({
                    startDate: startDate || "",
                    endDate: endDate || "",
               });
               const response = await fetch(
                    `https://backend-agustrisa.as1.pitunnel.net/api/dataGrafik/${type}?${params.toString()}`
               );
               const data = await response.json();
               if (data.length === 0) {
                    setChartData(["kosong"]);
                    setLoading(false);
                    return;
               }

               const formattedData = data.map((item) => ({
                    x: new Date(item.timestamp).toLocaleDateString(),
                    y: item.value,
               }));

               setChartData(formattedData);
               setLoading(false);
          } catch (error) {
               console.error("Error fetching chart data:", error);
               setLoading(false);
          }
     };

     const updateRandomData = () => {
          const drynessValue = generateRandomValue();
          const suhuValue = generateRandomValue();
          const tekananValue = generateRandomValue();
          const flowValue = generateRandomValue();
          const dayaValue = generateRandomValue();

          setDataCard({
               dryness_steam: drynessValue,
               suhu: suhuValue,
               tekanan: tekananValue,
               flow: flowValue,
               energi: dayaValue,
          });
     };

     useEffect(() => {
          updateRandomData();
          const intervalId = setInterval(updateRandomData, 2000);

          return () => clearInterval(intervalId);
     }, []);

     const generateRandomValue = () => {
          const value = (Math.random() * (100.5 - 99.0) + 99.0).toFixed(2);
          return value;
     };

     const handleClick = (idx, type, title) => {
          setActiveIdx((prevIdx) => (prevIdx === idx ? null : idx));
          setSelectedType(type);
          setSelectedTitle(title);
          fetchChartData(type);
     };

     const handleConfirmSorting = () => {
          fetchChartData(selectedType);
     };

     return (
          <>
               <div className="flex flex-wrap justify-around pt-24 w-full ">
                    <CardDashboard
                         titleCard="Dryness"
                         dataCard={dataCard.dryness_steam}
                         trendData={generateRandomValue()}
                         idx={0}
                         activeIdx={activeIdx}
                         onClick={() => handleClick(0, "dryness", "Dryness")}
                    />
                    <CardDashboard
                         titleCard="Suhu"
                         dataCard={dataCard.suhu}
                         trendData={generateRandomValue()}
                         idx={1}
                         activeIdx={activeIdx}
                         onClick={() => handleClick(1, "suhu", "Suhu")}
                    />
                    <CardDashboard
                         titleCard="Tekanan"
                         dataCard={dataCard.tekanan}
                         trendData={generateRandomValue()}
                         idx={2}
                         activeIdx={activeIdx}
                         onClick={() => handleClick(2, "tekanan", "Tekanan")}
                    />
                    <CardDashboard
                         titleCard="Flow"
                         dataCard={dataCard.flow}
                         trendData={generateRandomValue()}
                         idx={3}
                         activeIdx={activeIdx}
                         onClick={() => handleClick(3, "flow", "Flow")}
                    />
                    <CardDashboard
                         titleCard="Daya"
                         dataCard={dataCard.energi}
                         trendData={generateRandomValue()}
                         idx={4}
                         activeIdx={activeIdx}
                         onClick={() => handleClick(4, "daya", "Daya")}
                    />
               </div>
               <div className="pt-10 flex-col">
                    <div className="bg-white rounded-lg p-4 mb-5 flex items-center justify-between">
                         <p>Grafik</p>
                         <div className="flex items-center">
                              <p>Sorting by date</p>
                              <input
                                   type="date"
                                   className="border-2 border-gray-300 rounded-lg p-1 ml-2"
                                   value={startDate}
                                   onChange={(e) =>
                                        setStartDate(e.target.value)
                                   }
                              />
                              <input
                                   type="date"
                                   className="border-2 border-gray-300 rounded-lg p-1 ml-2"
                                   //  default nya hari ini atau tanggal sekarang
                                   value={
                                        endDate ||
                                        new Date().toISOString().split("T")[0]
                                   }
                                   onChange={(e) => setEndDate(e.target.value)}
                              />
                              <button
                                   className="bg-blue-500 text-white rounded-lg p-2 ml-2"
                                   onClick={handleConfirmSorting}>
                                   Konfirmasi Sorting
                              </button>
                         </div>
                    </div>

                    {loading ? (
                         <p>Loading...</p>
                    ) : (
                         <LineChart
                              chartData={chartData}
                              title={selectedTitle}
                         />
                    )}
               </div>
               <div className="pt-10 flex-col">
                    <TableData />
               </div>
          </>
     );
};

export default Dashboard;








