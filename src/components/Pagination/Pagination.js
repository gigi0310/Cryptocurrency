import React from "react";

const Pagination = ({ pages, currentPage, onPageClick }) => {
  return (
    <nav>
      <ul className="pagination">
        {pages.map((pageIndex) => (
          <li
            key={`1+${pageIndex}`}
            className={
              pageIndex === currentPage ? "page-item active" : "page-item"
            }
          >
            <p className="page-link" onClick={() => onPageClick(pageIndex)}>
              {pageIndex}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
