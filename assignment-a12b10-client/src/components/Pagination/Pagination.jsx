import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ itemsPerPage, items }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calculate the index range of items to display on the current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Render the current items */}
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(items.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
