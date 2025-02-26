"use client";
import React from "react";
import Button from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <Button
        type={currentPage === 1 ? "disable" : "primary"}
        size="sm"
        text="Previous"
        action="button"
        disable={currentPage === 1}
        clickHandler={() => setCurrentPage(currentPage - 1)}
      />
      <span className="px-4">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        type={currentPage === totalPages ? "disable" : "primary"}
        size="sm"
        text="Next"
        action="button"
        disable={currentPage === totalPages}
        clickHandler={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
