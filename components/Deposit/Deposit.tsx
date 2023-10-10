"use client";
import React, { useState, Fragment, FormEvent, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import HotToast from "react-hot-toast";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { AllUser, SiteInformations, User } from "@/const";
import "react-toastify/dist/ReactToastify.css";

const wallet = [
  { name: "Ads Wallet", value: "ads_wallet" },
  { name: "Games Wallet", value: "games_wallet" },
];
const methods = [
  { name: "Select Method" },
  { name: "Bkash Personal" },
  { name: "Bkash Agent" },
  { name: "Nagad Personal" },
  { name: "Nagad Agent" },
  { name: "Rocket Personal" },
  { name: "Rocket Agent" },
];

interface WithdrawNumber {
  account_type: string;
  banking_method: string;
  number: string;
}

interface DepositProps {
  siteInformations: SiteInformations;
  currentUser: User;
  allUsers: AllUser[];
}

const Deposit: React.FC<DepositProps> = ({
  siteInformations,
  currentUser,
  allUsers,
}) => {
  // console.log(allUsers);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const exchangeRate = 110;
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(wallet[0]);
  const [selected_method, setSelected_method] = useState(methods[0]);
  const [usdAmount, setUsdAmount] = useState("");
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [withdrawalNumberText, setWithdrawalNumberText] = useState<string>("");
  const [withdrawNumber, setWithdrawNumber] = useState("");
  console.log(withdrawalNumberText, "Here is the number", withdrawNumber);

  // Step 1: Add state variable to track whether the number has been copied
  const [isCopied, setIsCopied] = useState(false);

  // Step 2: Create a function to copy the text to clipboard
  const copyToClipboard = () => {
    const textToCopy = withdrawNumber;
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setIsCopied(true);
        })
        .catch((error) => {
          console.error("Failed to copy: ", error);
        });
    }
  };

  useEffect(() => {
    setWithdrawNumber("");
  }, [selected_method]);

  useEffect(() => {
    setIsCopied(false);
    const selectedMethodName = selected_method.name;
    const [selected_method_name, selected_method_type] =
      selectedMethodName.split(" ");

    // Ensure siteInformations and withdraw_numbers are defined
    if (siteInformations && siteInformations.withdraw_numbers) {
      const matchingWithdrawalNumber = siteInformations.withdraw_numbers.find(
        (withdrawNumber: WithdrawNumber) =>
          withdrawNumber.banking_method === selected_method_name &&
          withdrawNumber.account_type === selected_method_type
      );

      const amount = parseInt(usdAmount);

      //   console.log(amount);
      const BDTAmount = amount * siteInformations.dollar_rate;

      if (!matchingWithdrawalNumber) {
        if (selected_method.name === "Select Method") {
          setWithdrawalNumberText("");
        } else {
          setWithdrawalNumberText(
            "No such payment method availble now. Please select another method."
          );
        }
      } else if (!matchingWithdrawalNumber && !amount) {
        setWithdrawalNumberText("");
      } else if (matchingWithdrawalNumber && !amount) {
        setWithdrawalNumberText("Please insert amount");
      } else if (matchingWithdrawalNumber && amount) {
        if (selected_method_type === "Personal") {
          setWithdrawNumber(matchingWithdrawalNumber.number);
          setWithdrawalNumberText(
            `Send Money ${BDTAmount} TK at ${matchingWithdrawalNumber.number}`
          );
        } else if (selected_method_type === "Agent") {
          setWithdrawNumber(matchingWithdrawalNumber.number);

          setWithdrawalNumberText(
            `Do Cash Out ${BDTAmount} TK at ${matchingWithdrawalNumber.number} And then fill up the form below`
          );
        }
      } else if (!matchingWithdrawalNumber && amount) {
        setWithdrawalNumberText("");
      } else {
        setWithdrawalNumberText("No option available");
      }
    }
  }, [selected_method, siteInformations, usdAmount]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPaymentPhoneNumber(inputValue);

    // Define a regex pattern for valid phone numbers
    const phoneNumberPattern = /^(01\d{9}|(\+880\d{10}))$/;

    // Check if the input matches the pattern
    const isValid = phoneNumberPattern.test(inputValue);

    // Update the validation state
    setIsValidPhoneNumber(isValid);
  };
  const [trxId, setTrxId] = useState("");

  const isDuplicateTransaction = (allUsers: AllUser[], trxId: string) => {
    // Iterate through allUsers to check transactionHistory of each user
    for (const user of allUsers) {
      if (
        user.transactionHistory.some(
          (transaction) => transaction.trx_id === trxId
        )
      ) {
        return true; // Found a matching transaction ID
      }
    }
    return false; // No matching transaction ID found in any user's transactionHistory
  };

  // Function to handle form submission
  const handleDeposit = async (e: FormEvent) => {
    e.preventDefault();

    if (disabled) return;

    setDisabled(true);

    if (parseInt(usdAmount) < siteInformations?.min_deposit_rate) {
      setDisabled(false);
      return HotToast.error(
        `Deposit at least $${siteInformations?.min_deposit_rate}`
      );
    }

    if (isDuplicateTransaction(allUsers, trxId)) {
      setDisabled(false);
      return HotToast.error("The Transaction ID has already been used!");
    }

    // if (isDuplicateTransaction(allUsers, trxId)) {
    //   setDisabled(false);
    //   return toast.error("The Transaction ID has already been utilized", {
    //     autoClose: false, // Prevents auto-close
    //     closeButton: true, // Enables the close button
    //   });
    // }

    const jwtToken = token;

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const apiEndpoint = "https://server.adsporty.com/deposit";

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        selected_wallet: selected.value,
        deposit_amount: usdAmount,
        payment_method: selected_method.name,
        payment_phone_number: paymentPhoneNumber,
        trx_id: trxId,
      });

      const successNotificationId = toast.success(response.data.message, {
        autoClose: false,
        className: "md:w-[650px]",
        position: toast.POSITION.TOP_LEFT,
        closeButton: true,
        onClose: () => {
          router.refresh();
          router.push("/wallet");
        },
      });

      setTimeout(() => {
        toast.dismiss(successNotificationId);
      }, 10000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        HotToast.error(errorMessage);
      } else {
        HotToast.error("Something went wrong!");
      }
    }

    // finally {
    //   setDisabled(false);
    // }
  };

  return (
    <section className="pt-[85px] p-3 md-p-0 md:pt-[150px] mb-section-gap-sm md:mb-section-gap">
      {/* Same as */}
      <div className="w-full  max-w-xl mx-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl ">
        <Heading title="Deposit Here" />
        <form onSubmit={handleDeposit}>
          <div className="mt-4">
            <label className="text-sm">Select Wallet</label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative z-10 mt-1">
                <Listbox.Button className="relative border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {wallet.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-purple-100 text-purple-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="mt-4">
            <label className="text-sm">Deposit Amount (USD)</label>
            <div className="flex items-center justify-between gap-2">
              <input
                type="number"
                required
                className="border p-1 w-full rounded-lg px-3"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
              />
              <p className="border p-1 px-4 w-full rounded-lg">
                {usdAmount !== ""
                  ? `BDT ${(parseFloat(usdAmount) * exchangeRate).toFixed(2)}`
                  : "BDT 0.00"}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-3 text-sm">Payment Method</label>

            <Listbox value={selected_method} onChange={setSelected_method}>
              <div className="relative z-10 mt-1">
                <Listbox.Button className="relative border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected_method.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 ">
                    {methods.map((method, Id) => (
                      <Listbox.Option
                        key={Id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-purple-100 text-purple-900"
                              : "text-gray-900"
                          }`
                        }
                        value={method}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {method.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {withdrawalNumberText && (
              <div
                className={`my-5 py-0.5 border rounded-lg text-gray-700 font-semibold text-lg grid ${
                  withdrawNumber && "grid-cols-6"
                } justify-around items-center`}
              >
                <span className="text-base px-3 col-span-5 text-purple-600 font-semibold">
                  {" "}
                  {<span>{withdrawalNumberText}</span>}
                </span>
                <span className="col-span-1">
                  {withdrawNumber && (
                    <div className="ml-2 relative">
                      <button
                        onClick={copyToClipboard}
                        className={`${
                          isCopied ? "opacity-0" : ""
                        } bg-transparent border-none p-2 rounded-full focus:outline-none hover:bg-gray-200`}
                      >
                        <svg
                          className="w-7 h-7"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M12,2h.5A1.5,1.5,0,0,1,14,3.5v10A1.5,1.5,0,0,1,12.5,15h-9A1.5,1.5,0,0,1,2,13.5V3.5A1.5,1.5,0,0,1,3.5,2H4"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                          ></path>
                          <rect
                            x="6"
                            y="1"
                            width="4"
                            height="2"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></rect>
                          <polyline
                            className="copy-to-clip__icon-check"
                            points="5 9 7 11 11 7"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></polyline>
                        </svg>
                      </button>
                      {/* Conditionally render the tooltip */}
                      {isCopied && (
                        <div className="absolute top-[3%] right-[25%] bg-gray-800 text-white px-2 py-1.5 rounded-full">
                          <svg
                            className="w-6 h-6"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M12,2h.5A1.5,1.5,0,0,1,14,3.5v10A1.5,1.5,0,0,1,12.5,15h-9A1.5,1.5,0,0,1,2,13.5V3.5A1.5,1.5,0,0,1,3.5,2H4"
                              fill="none"
                              stroke="currentColor"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                            ></path>
                            <rect
                              x="6"
                              y="1"
                              width="4"
                              height="2"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></rect>
                            <polyline
                              className="copy-to-clip__icon-check"
                              points="5 9 7 11 11 7"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                </span>
              </div>
            )}

            {/* <p className="my-4 text-gray-700 font-semibold text-lg flex items-center">
              {withdrawNumber && <span>{withdrawalNumberText}</span>}
              {withdrawalNumberText !==
                "No such payment method available now. Please select another method." &&
                !isCopied &&
                withdrawalNumberText !== "" && (
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-400 cursor-pointer"
                  >
                    Copy Number
                  </button>
                )}

              {isCopied && <span className="text-green-600 ml-2">Copied</span>}
            </p> */}
          </div>

          {withdrawalNumberText && usdAmount && (
            <>
              {" "}
              <div className="flex flex-col gap-2 my-5">
                <label className="text-sm">Payment Phone Number</label>
                <input
                  type="text"
                  required
                  className={`border p-1 w-full rounded-lg px-3 ${
                    !isValidPhoneNumber ? "border-red-500" : ""
                  }`}
                  value={paymentPhoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                {!isValidPhoneNumber && (
                  <p className="text-red-500">Invalid phone number format.</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Transaction/Trx ID</label>
                <input
                  type="text"
                  required
                  className="border p-1 w-full mb-4 rounded-lg px-3"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="mt-3">
            <button
              disabled={disabled}
              type="submit"
              className={`inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Deposit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Deposit;
