"use client";

import React, { useState } from "react";
import Heading from "../Heading";

const WalletHistory = ({ transactionHistory }) => {
  // console.log(transactionHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalTransactions = transactionHistory?.length || 0;

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  // Get the transactions for the current page
  const currentTransactions = transactionHistory
    ?.reverse()
    .slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  let isAvailable;
  if (transactionHistory) isAvailable = transactionHistory.length;
  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-8">
      <Heading title="Transaction History" center />
      {isAvailable >= 1 ? (
        <>
          <div className="hidden md:block mt-6 md:mt-12 relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-gray-600 font-medium border-b">
                <tr>
                  <th className=" py-6 md:py-3 pr-3 md:pr-6">Date</th>
                  <th className=" py-6 md:py-3 pr-3 md:pr-6">Wallet</th>
                  <th className="py-6 md:py-3 pr-3 md:pr-6">Transfer Type</th>
                  <th className="py-6 md:py-3 pr-3 md:pr-6">Amount</th>
                  <th className="py-6 md:py-3">Approval</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {currentTransactions.map((item, idx) => (
                  <tr key={idx}>
                    <td className="pr-3 md:pr-6 py-6 md:py-4 whitespace-nowrap">
                      {item?.date || "Not Added"}
                    </td>
                    <td className="pr-3 md:pr-6 py-6 md:py-4 whitespace-nowrap">
                      {
                      item?.selected_wallet === "ads_wallet"
                        ? "Ads Wallet"
                        : item?.selected_wallet === "games_wallet"
                        ? "Games Wallet"
                        : "Not Added"}
                    </td>

                    <td className="pr-3 md:pr-6 py-6 md:py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs ${
                          item.transaction_type === "deposit"
                            ? "text-purple-600 bg-purple-50"
                            : item.transaction_type === "Prediction Bonus" ||
                              item.transaction_type === "Referral Received"
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}
                      >
                        {item.transaction_type}
                      </span>
                    </td>
                    <td className="pr-3 md:pr-6 py-6 md:py-4 whitespace-nowrap">
                      ${item.amount}
                    </td>
                    <td className="py-6 md:py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-2 rounded-full font-semibold text-xs ${
                          item.transaction_status === "approved"
                            ? "text-green-600 bg-green-50"
                            : item.transaction_status === "rejected"
                            ? "text-red-600 bg-red-50"
                            : "text-purple-600 bg-purple-50"
                        }`}
                      >
                        {item.transaction_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={` ${
                  currentPage === 1
                    ? "cursor-not-allowed"
                    : "transition-all duration-300 ease-in-out"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-5 h-5 mr-2 ${
                      currentPage !== 1 ? "transform hover:scale-110" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </span>
              </button>
              <button
                onClick={nextPage}
                disabled={endIndex >= totalTransactions}
                className={`${
                  endIndex >= totalTransactions
                    ? "cursor-not-allowed"
                    : " transition-all duration-300 ease-in-out"
                }`}
              >
                <span className="flex items-center">
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-5 h-5 ml-2 ${
                      endIndex < totalTransactions
                        ? "transform hover:scale-110"
                        : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div className="md:hidden mt-6 md:mt-12 space-y-4">
            {currentTransactions.map((item, idx) => (
              <div key={idx} className="bg-white shadow-md p-4 rounded-lg">
                <div className="mt-2">
                  <div className="flex justify-between mb-3">
                    <strong>Date:</strong>
                    <p>{item?.date || "Not Added"}</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <strong>Amount:</strong>
                    <p>${item.amount}</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <strong>Wallet:</strong>{" "}
                    {item?.selected_wallet === "ads_wallet"
                      ? "Ads Wallet"
                      : item?.selected_wallet === "games_wallet"
                      ? "Games Wallet"
                      : "Not Added"}
                  </div>
                  <div className="flex justify-between mb-3">
                    <strong>Transfer Type:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-xs ${
                        item.transaction_type === "deposit"
                          ? "text-purple-600 bg-purple-50"
                          : item.transaction_type === "Prediction Bonus" ||
                            item.transaction_type === "Referral Received"
                          ? "text-green-600 bg-green-50"
                          : "text-red-600 bg-red-50"
                      }`}
                    >
                      {item.transaction_type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <strong>Transaction Status:</strong>{" "}
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${
                        item.transaction_status === "approved"
                          ? "text-green-600 bg-green-50"
                          : item.transaction_status === "rejected"
                          ? "text-red-600 bg-red-50"
                          : "text-purple-600 bg-purple-50"
                      }`}
                    >
                      {item.transaction_status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={` ${
                  currentPage === 1
                    ? "cursor-not-allowed"
                    : "transition-all duration-300 ease-in-out"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-5 h-5 mr-2 ${
                      currentPage !== 1 ? "transform hover:scale-110" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </span>
              </button>
              <button
                onClick={nextPage}
                disabled={endIndex >= totalTransactions}
                className={`${
                  endIndex >= totalTransactions
                    ? "cursor-not-allowed"
                    : " transition-all duration-300 ease-in-out"
                }`}
              >
                <span className="flex items-center">
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-5 h-5 ml-2 ${
                      endIndex < totalTransactions
                        ? "transform hover:scale-110"
                        : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="container flex items-center px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
              <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-purple-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                No Transaction found!
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Your financial adventure is just around the corner
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WalletHistory;
