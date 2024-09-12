import { useState, useEffect } from "react";
import preveusbtn from "../../assets/preveusbtn.svg";
import nextbtn from "../../assets/nextbtn.svg";

const TableData = () => {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [currentPage, setCurrentPage] = useState(1);
     const [startDate, setStartDate] = useState(
          `${new Date().getFullYear()}-01-01`
     );
     const [endDate, setEndDate] = useState(
          new Date().toISOString().split("T")[0]
     );
     const [sortField, setSortField] = useState(null);
     const [sortOrder, setSortOrder] = useState(true); 

     const rowsPerPage = 10;

     const fetchData = async (startDate, endDate) => {
          setLoading(true);
          try {
               const url = `https://backend-agustrisa.as1.pitunnel.net/api/history?startDate=${startDate}&endDate=${endDate}`;
               const response = await fetch(url);
               const result = await response.json();
               setData(result);
               setLoading(false);
          } catch (error) {
               console.error("Error fetching data:", error);
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData(startDate, endDate);
     }, [startDate, endDate]);

     const handleConfirmSorting = () => {
          setCurrentPage(1);
          fetchData(startDate, endDate);
     };

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const sortData = (field) => {
          const sortedData = [...data].sort((a, b) => {
               if (a[field] < b[field]) return sortOrder ? -1 : 1;
               if (a[field] > b[field]) return sortOrder ? 1 : -1;
               return 0;
          });
          setData(sortedData);
          setSortField(field);
          setSortOrder(!sortOrder); 
     };

     const indexOfLastRow = currentPage * rowsPerPage;
     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
     const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
     const totalPages = Math.ceil(data.length / rowsPerPage);

     return (
          <div className="bg-white p-6 rounded-lg">
               <div className="flex justify-between items-center">
                    <p className="text-start text-2xl font-semibold text-gray-800 mb-4">
                         Table Data
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-5 flex items-center">
                         <p>Sorting by date</p>
                         <div className="flex items-center">
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
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                              />
                              <button
                                   className="bg-blue-500 text-white rounded-lg p-2 ml-2"
                                   onClick={handleConfirmSorting}>
                                   Konfirmasi Sorting
                              </button>
                         </div>
                    </div>
               </div>

               {loading ? (
                    <p>Loading data...</p>
               ) : (
                    <>
                         <table className="min-w-full bg-white">
                              <thead>
                                   <tr>
                                        <th className="py-2 px-4 border-t border-b text-start">
                                             Date
                                             <button
                                                  className="ms-2"
                                                  onClick={() =>
                                                       sortData("timestamp")
                                                  }>
                                                  {sortField === "timestamp" &&
                                                  sortOrder
                                                       ? "⬆"
                                                       : "⬇"}
                                             </button>
                                        </th>
                                        <th className="py-2 px-4 border-t border-b">
                                             Temperature
                                             <button
                                                  className="ms-2"
                                                  onClick={() =>
                                                       sortData("temperature")
                                                  }>
                                                  {sortField ===
                                                       "temperature" &&
                                                  sortOrder
                                                       ? "⬆"
                                                       : "⬇"}
                                             </button>
                                        </th>
                                        <th className="py-2 px-4 border-t border-b">
                                             Pressure
                                             <button
                                                  className="ms-2"
                                                  onClick={() =>
                                                       sortData("pressure")
                                                  }>
                                                  {sortField === "pressure" &&
                                                  sortOrder
                                                       ? "⬆"
                                                       : "⬇"}
                                             </button>
                                        </th>
                                        <th className="py-2 px-4 border-t border-b">
                                             Flow
                                             <button
                                                  className="ms-2"
                                                  onClick={() =>
                                                       sortData("flow")
                                                  }>
                                                  {sortField === "flow" &&
                                                  sortOrder
                                                       ? "⬆"
                                                       : "⬇"}
                                             </button>
                                        </th>
                                        <th className="py-2 px-4 border-t border-b">
                                             Dryness
                                             <button
                                                  className="ms-2"
                                                  onClick={() =>
                                                       sortData("dryness")
                                                  }>
                                                  {sortField === "dryness" &&
                                                  sortOrder
                                                       ? "⬆"
                                                       : "⬇"}
                                             </button>
                                        </th>
                                        <th className="py-2 px-4 border-t border-b">
                                             Power Prediction
                                             <button
                                                  className="ms-2"
                                                  onClick={() =>
                                                       sortData(
                                                            "power_prediction"
                                                       )
                                                  }>
                                                  {sortField ===
                                                       "power_prediction" &&
                                                  sortOrder
                                                       ? "⬆"
                                                       : "⬇"}
                                             </button>
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {currentRows.map((row, index) => (
                                        <tr key={index} className="text-center">
                                             <td className="py-2 px-4 border-t border-b text-start">
                                                  {new Date(
                                                       row.timestamp
                                                  ).toLocaleDateString()}
                                             </td>
                                             <td className="py-2 px-4 border-t border-b">
                                                  {row.temperature}
                                             </td>
                                             <td className="py-2 px-4 border-t border-b">
                                                  {row.pressure}
                                             </td>
                                             <td className="py-2 px-4 border-t border-b">
                                                  {row.flow}
                                             </td>
                                             <td className="py-2 px-4 border-t border-b">
                                                  {row.dryness}
                                             </td>
                                             <td className="py-2 px-4 border-t border-b">
                                                  {row.power_prediction}
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>

                         {/* Pagination */}
                         <div className="flex justify-between mt-4">
                              <div className="flex-row text-gray-500 font-thin">
                                   <p>
                                        Showing {indexOfFirstRow + 1} to{" "}
                                        {indexOfLastRow > data.length
                                             ? data.length
                                             : indexOfLastRow}{" "}
                                        of {data.length} entries
                                   </p>
                              </div>

                              <div className="flex justify-center items-center space-x-2">
                                   <button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                             handlePageChange(currentPage - 1)
                                        }
                                        className="px-4 py-2 bg-white flex items-center border border-black rounded-xl hover:bg-gray-900 hover:text-white">
                                        <img
                                             src={preveusbtn}
                                             alt="<<"
                                             className="w-4 h-4 mr-2"
                                        />
                                        <p>Previous</p>
                                   </button>

                                   <div className="flex bg-gray-100 flex-row border-black border rounded-xl">
                                        {Array.from(
                                             { length: totalPages },
                                             (_, i) => (
                                                  <button
                                                       key={i + 1}
                                                       onClick={() =>
                                                            handlePageChange(
                                                                 i + 1
                                                            )
                                                       }
                                                       className={`px-4 py-2 rounded-xl ${
                                                            i + 1 ===
                                                            currentPage
                                                                 ? "bg-black text-white rounded-lg"
                                                                 : "bg-none"
                                                       }`}>
                                                       {i + 1}
                                                  </button>
                                             )
                                        )}
                                   </div>

                                   <button
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                             handlePageChange(currentPage + 1)
                                        }
                                        className="px-4 py-2 bg-white flex items-center border border-black rounded-xl hover:bg-gray-900 hover:text-white">
                                        <p>Next</p>
                                        <img
                                             src={nextbtn}
                                             alt=">>"
                                             className="w-4 h-4 ml-2"
                                        />
                                   </button>
                              </div>
                         </div>
                    </>
               )}
          </div>
     );
};

export default TableData;
