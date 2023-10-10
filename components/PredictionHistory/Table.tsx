"use client";
import React, { useState } from "react";
import TableRow from "./TableRow";
import TableCard from "./TableCard";
import { User } from "@/const";

interface TableProps {
  currentUser: User | null;
}

const Table: React.FC<TableProps> = ({ currentUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this to your desired number of items per page

  const totalItems = currentUser?.gamesPredictionHistory?.length || 0;
  // console.log(totalItems)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const pagination = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-2 rounded-md cursor-pointer mr-2 ${
          i === currentPage
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
        style={{ padding: "8px 16px" }} // Adjust the padding as needed
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center py-6 md:py-12">
      <div className="w-full xl:w-11/12">
        <div className="overflow-x-auto">
          <div className="md:hidden flex flex-col gap-4">
            {currentUser?.gamesPredictionHistory
              ?.slice(startIndex, endIndex)
              .map((data, index) => (
                <TableCard key={index} data={data} />
              ))}
            <div className="flex justify-center mt-4">{pagination}</div>
          </div>
          <div className="hidden md:block align-middle min-w-full shadow-md rounded-lg overflow-hidden sm:rounded-lg">
            {currentUser ? (
              currentUser?.gamesPredictionHistory?.length > 0 ? (
                <>
                  <table className="min-w-full">
                    <thead className="">
                      <tr className="">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Game Type</th>
                        <th className="pb-3">Teams</th>
                        <th className="pb-3">Selected Teams</th>
                        <th className="pb-3">Winning Teams</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser?.gamesPredictionHistory
                        ?.slice(startIndex, endIndex)
                        .map((data, index) => (
                          <TableRow key={index} data={data} />
                        ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-4">{pagination}</div>
                </>
              ) : (
                <p className="py-5 text-center md:text-xl font-semibold">
                  No prediction history available.
                </p>
              )
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
