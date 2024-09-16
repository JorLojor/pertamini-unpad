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
               if (Array.isArray(result)) {
                    setData(result);
               } else {
                    setData([]);
               }
               setLoading(false);
          } catch (error) {
               console.error("Error fetching data:", error);
               setData([]);
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
     const currentRows = Array.isArray(data)
          ? data.slice(indexOfFirstRow, indexOfLastRow)
          : [];
     const totalPages = Math.ceil(data.length / rowsPerPage);

     const renderPagination = () => {
          const pageNumbers = [];

          if (totalPages <= 4) {
               for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
               }
          } else {
               pageNumbers.push(1);

               if (currentPage > 2) {
                    pageNumbers.push("...");
               }

               if (currentPage !== 1 && currentPage !== totalPages) {
                    pageNumbers.push(currentPage);
               }

               if (currentPage < totalPages - 1) {
                    pageNumbers.push("...");
               }

               pageNumbers.push(totalPages);
          }

          return (
               <div className="flex bg-gray-100 flex-row border-black border rounded-xl">
                    {pageNumbers.map((page, index) => (
                         <button
                              key={index}
                              onClick={() => {
                                   if (page !== "...") handlePageChange(page);
                              }}
                              className={`px-4 py-2 rounded-xl ${
                                   page === currentPage
                                        ? "bg-black text-white"
                                        : ""
                              }`}
                              disabled={page === "..."}>
                              {page}
                         </button>
                    ))}
               </div>
          );
     };

     return (
          <div className="bg-white p-6 rounded-lg">
               <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
                    <p className="text-start text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                         Table Data
                    </p>
                    <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row items-center">
                         <p>Sorting by date</p>
                         <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
                              <input
                                   type="date"
                                   className="border-2 border-gray-300 rounded-lg p-1 md:ml-2 mt-2 md:mt-0"
                                   value={startDate}
                                   onChange={(e) =>
                                        setStartDate(e.target.value)
                                   }
                              />
                              <input
                                   type="date"
                                   className="border-2 border-gray-300 rounded-lg p-1 md:ml-2 mt-2 md:mt-0"
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                              />
                              <button
                                   className="bg-blue-500 text-white rounded-lg p-2 md:ml-2 mt-2 md:mt-0"
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
                         <div className="overflow-x-auto">
                              <table className="min-w-full bg-white">
                                   <thead>
                                        <tr>
                                             <th className="py-2 px-4 border-t border-b text-start">
                                                  Date
                                                  <button
                                                       className="ms-2"
                                                       onClick={() =>
                                                            sortData(
                                                                 "timestamp"
                                                            )
                                                       }>
                                                       {sortField ===
                                                            "timestamp" &&
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
                                                            sortData(
                                                                 "temperature"
                                                            )
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
                                                       {sortField ===
                                                            "pressure" &&
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
                                                       {sortField ===
                                                            "dryness" &&
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
                                             <tr
                                                  key={index}
                                                  className="text-center">
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
                         </div>

                         {/* Pagination */}
                         <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
    <div className="text-gray-500 font-thin text-center md:text-left">
        <p>
            Showing {indexOfFirstRow + 1} to{" "}
            {indexOfLastRow > data.length ? data.length : indexOfLastRow} of{" "}
            {data.length} entries
        </p>
    </div>

    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 bg-white flex items-center border border-black rounded-xl hover:bg-gray-900 hover:text-white ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            <img src={preveusbtn} alt="<<" className="w-4 h-4 mr-2" />
            <p>Previous</p>
        </button>

        {renderPagination()}

        <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 bg-white flex items-center border border-black rounded-xl hover:bg-gray-900 hover:text-white ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            <p>Next</p>
            <img src={nextbtn} alt=">>" className="w-4 h-4 ml-2" />
        </button>
    </div>
</div>

                    </>
               )}
          </div>
     );
};

export default TableData;
