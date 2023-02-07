import React, { useEffect } from "react";
import ChevronLeft from "../../../Assets/Icons/svg/ChevronLeft.svg";
import ChevronRight from "../../../Assets/Icons/svg/Chevron.svg";
import Button from "../../Button";
import AddModalDailyReport from "../../Modal/DailyReportModal/AddModal/AddModal";

const TableFooter = ({ totalPages, currentPage, onPageChange, limit, sort, totalItems }) => {
  return (
    <div className="pagination flex justify-between py-[12px] px-[20px] align-center">
      <div className="flex align-center">
        <span className="pagination__counter text-gray-600 font-bold py-2 px-4 pr-10 mt-1.5">
          Page {currentPage} of {totalPages} 
        </span>

        <button 
          className="pagination__button hover:bg-primary-light font-bold py-2 px-4 rounded-lg flex items-center mx-1 transition duration-300 ease-in-out" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={ChevronLeft} className="pr-3 hover:text-background-snow "></img>
          Previous 
        </button>

        <button 
          className="pagination__button hover:bg-primary-light text-gray-800 font-bold py-2 px-4 rounded-lg flex items-center mx-1 transition duration-300 ease-in-out" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <img src={ChevronRight} className="pl-3"></img>
        </button>
      </div>

      {/* <div className="add-button">
        <Button label="+ Add Meeting"/>
      </div> */}

      <AddModalDailyReport page={currentPage} limit={limit} sort={sort} total={totalItems}/>
    </div>
  )
}

export default TableFooter;