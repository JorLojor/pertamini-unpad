import PropTypes from "prop-types";
import { useState } from "react";
import preveusbtn from "../../assets/preveusbtn.svg";
import nextbtn from "../../assets/nextbtn.svg";

const DataTableAnalytic = ({ data }) => {
     const [sortField, setSortField] = useState(null);
     const [sortOrder, setSortOrder] = useState(true);
     const [sortedData, setSortedData] = useState(data);
     const [currentPage, setCurrentPage] = useState(1);
     const rowsPerPage = 5;

     const sortData = (field) => {
          const sorted = [...sortedData].sort((a, b) => {
               if (a[field] < b[field]) return sortOrder ? -1 : 1;
               if (a[field] > b[field]) return sortOrder ? 1 : -1;
               return 0;
          });
          setSortedData(sorted);
          setSortField(field);
          setSortOrder(!sortOrder);
     };

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const indexOfLastRow = currentPage * rowsPerPage;
     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
     const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
     const totalPages = Math.ceil(sortedData.length / rowsPerPage);

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
          <div className="bg-white rounded-lg p-6 mt-5 overflow-y-auto">
               <h2 className="text-2xl mb-4 font-semibold text-gray-800">
                    Data Table
               </h2>
               <table className="min-w-full bg-white">
                    <thead>
                         <tr>
                              <th className="py-2 px-4 border-t border-b text-start">
                                   No
                              </th>
                              <th className="py-2 px-4 border-t border-b text-start">
                                   Tanggal
                                   <button
                                        className="ml-2"
                                        onClick={() => sortData("tanggal")}>
                                        {sortField === "tanggal" && sortOrder
                                             ? "⬆"
                                             : "⬇"}
                                   </button>
                              </th>
                              <th className="py-2 px-4 border-t border-b text-start">
                                   Min Value
                                   <button
                                        className="ml-2"
                                        onClick={() => sortData("min_value")}>
                                        {sortField === "min_value" && sortOrder
                                             ? "⬆"
                                             : "⬇"}
                                   </button>
                              </th>
                              <th className="py-2 px-4 border-t border-b text-start">
                                   Max Value
                                   <button
                                        className="ml-2"
                                        onClick={() => sortData("max_value")}>
                                        {sortField === "max_value" && sortOrder
                                             ? "⬆"
                                             : "⬇"}
                                   </button>
                              </th>
                              <th className="py-2 px-4 border-t border-b text-start">
                                   Avg Value
                                   <button
                                        className="ml-2"
                                        onClick={() => sortData("avg_value")}>
                                        {sortField === "avg_value" && sortOrder
                                             ? "⬆"
                                             : "⬇"}
                                   </button>
                              </th>
                              <th className="py-2 px-4 border-t border-b text-start">
                                   Std Dev
                                   <button
                                        className="ml-2"
                                        onClick={() =>
                                             sortData("stddev_value")
                                        }>
                                        {sortField === "stddev_value" &&
                                        sortOrder
                                             ? "⬆"
                                             : "⬇"}
                                   </button>
                              </th>
                         </tr>
                    </thead>
                    <tbody>
                         {currentRows.map((row) => (
                              <tr key={row.no} className="text-center">
                                   <td className="py-2 px-4 border-t border-b text-start">
                                        {row.no}
                                   </td>
                                   <td className="py-2 px-4 border-t border-b text-start">
                                        {row.tanggal}
                                   </td>
                                   <td className="py-2 px-4 border-t border-b text-start">
                                        {row.min_value}
                                   </td>
                                   <td className="py-2 px-4 border-t border-b text-start">
                                        {row.max_value}
                                   </td>
                                   <td className="py-2 px-4 border-t border-b text-start">
                                        {row.avg_value}
                                   </td>
                                   <td className="py-2 px-4 border-t border-b text-start">
                                        {row.stddev_value}
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>

               {/* Pagination */}
               <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
    <div className="text-gray-500 font-thin mb-2 sm:mb-0">
        <p>
            Showing {indexOfFirstRow + 1} to{" "}
            {indexOfLastRow > sortedData.length
                ? sortedData.length
                : indexOfLastRow}{" "}
            of {sortedData.length} entries
        </p>
    </div>

    <div className="flex justify-center items-center space-x-2">
        <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-white flex items-center border border-black rounded-xl hover:bg-gray-900 hover:text-white m-1">
            <img
                src={preveusbtn}
                alt="<<"
                className="w-4 h-4 mr-2"
            />
            <p>Previous</p>
        </button>

        {renderPagination()}

        <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-white flex items-center border border-black rounded-xl hover:bg-gray-900 hover:text-white m-1">
            <p>Next</p>
            <img
                src={nextbtn}
                alt=">>"
                className="w-4 h-4 ml-2"
            />
        </button>
    </div>
</div>

          </div>
     );
};

DataTableAnalytic.propTypes = {
     data: PropTypes.arrayOf(
          PropTypes.shape({
               no: PropTypes.number.isRequired,
               tanggal: PropTypes.string.isRequired,
               min_value: PropTypes.number.isRequired,
               max_value: PropTypes.number.isRequired,
               avg_value: PropTypes.number.isRequired,
               stddev_value: PropTypes.number.isRequired,
          })
     ).isRequired,
};

export default DataTableAnalytic;
