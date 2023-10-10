"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import HotToast from "react-hot-toast";
import { Fragment, useState, FormEvent } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Heading from "@/components/Heading";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { SiteInformations } from "@/const";
import "react-toastify/dist/ReactToastify.css";

const wallet = [
  { name: "Ads Wallet", value: "ads_wallet" },
  { name: "Games Wallet", value: "games_wallet" },
];
const methods = [{ name: "Bkash" }, { name: "Nagad" }, { name: "Rocket" }];

interface WithdrawProps {
  siteInformation: SiteInformations;
}

const Withdraw: React.FC<WithdrawProps> = ({ siteInformation }) => {
  //   console.log(siteInformation.dollar_rate);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(wallet[0]);
  const [selected_method, setSelected_method] = useState(methods[0]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

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
  const exchangeRate = siteInformation?.dollar_rate;

  const handleWithdraw = async (e: FormEvent) => {
    e.preventDefault();

    if (disabled) return;

    if (parseInt(withdrawAmount) < 2) {
      return HotToast.error("Minimum withdrawal request is $3");
    }

    setDisabled(true);
    const jwtToken = token;

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const apiEndpoint = "https://server.adsporty.com/withdraw";

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        selected_wallet: selected.value,
        withdraw_amount: withdrawAmount,
        selected_method: selected_method.name,
        reciever_number: paymentPhoneNumber,
      });
      const successNotificationId = toast.success(response.data.message, {
        autoClose: false,
        className: "md:w-[650px]",
        closeButton: true,
        position: toast.POSITION.TOP_LEFT,
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
        HotToast.error("Withdraw Failed!");
      }
      setDisabled(false);
    }
  };

  return (
    <section className="pt-[85px] p-3 md-p-0 md:pt-[150px] mb-section-gap-sm md:mb-section-gap">
      <div className="w-full max-w-xl mx-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
        <Heading title="Withdraw Here" />
        <form onSubmit={handleWithdraw}>
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
            <label className="text-sm">Withdraw Amount (USD)</label>
            <div className="flex items-center justify-between gap-2">
              <input
                type="number"
                required
                className="border p-1 w-full rounded-lg px-3"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <p className="border p-1 px-4 w-full rounded-lg">
                {withdrawAmount !== ""
                  ? `BDT ${(parseFloat(withdrawAmount) * exchangeRate).toFixed(
                      2
                    )}`
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
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
          </div>

          <div className="flex flex-col gap-2 my-5">
            <label className="text-sm">Payment Receive Number (Personal)</label>
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

          <div className="mt-3">
            <button
              disabled={disabled}
              type="submit"
              className={`inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 
              focus-visible:ring-offset-2 ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
      <ToastContainer hideProgressBar={false} />
    </section>
  );
};

export default Withdraw;
