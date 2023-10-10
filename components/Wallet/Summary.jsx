"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import Text from "./Text";
import WalletHistory from "./WalletHistory";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const Summary = ({ currentUser }) => {
  // console.log(currentUser?.userinformation);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const [disabled, setDisabled] = useState(false);
  const [gamesAmount, setGamesAmount] = useState("");
  const [adsAmount, setAdsAmount] = useState("");

  const handleTransferToGames = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const apiEndpoint = "https://server.adsporty.com/transferToGames";

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        amount: gamesAmount,
      });
      toast.success(response.data.message);
      closeModal_trans_ads();
      setDisabled(false);
      setTimeout(() => {
        router.refresh();
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        closeModal_trans_ads();
      } else {
        toast.error("Transfer Failed!");
        closeModal_trans_ads();
      }
    }

    setGamesAmount("");
    setDisabled(false);
  };

  const handleTransferToAds = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const jwtToken = token;

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const apiEndpoint = "https://server.adsporty.com/transferToAds";

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        amount: adsAmount,
      });
      toast.success(response.data.message);
      closeModal_trans_games();
      setDisabled(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
        closeModal_trans_games();
      } else {
        toast.error("Transfer Failed!");
        closeModal_trans_games();
      }
    }

    setAdsAmount("");
    setDisabled(false);
  };

  const totalBalance =
    currentUser?.ads_wallet?.balance + currentUser?.games_wallet?.balance;

  // Withdraw method state
  let [isOpen_trans_ads, setIsOpen_trans_ads] = useState(false);
  let [isOpen_trans_games, setIsOpen_trans_games] = useState(false);

  // Transfer from Ads Wallet
  function closeModal_trans_ads() {
    setIsOpen_trans_ads(false);
  }

  function openModal_trans_ads() {
    setIsOpen_trans_ads(true);
  }

  // Transfer from games Wallet
  function closeModal_trans_games() {
    setIsOpen_trans_games(false);
  }

  function openModal_trans_games() {
    setIsOpen_trans_games(true);
  }

  return (
    <section className="pt-[120px] mb-section-gap mx-4">
      <article className="max-w-screen-sm mx-auto hover:animate-background rounded-xl bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        <div className="flex flex-col gap-3 rounded-[10px] bg-white p-4 sm:p-6">
          <p className="text-lg md:text-xl font-semibold flex justify-center items-center my-4 text-black">
            {" "}
            Wallet Summary{" "}
          </p>
          <Text label="Total Balance" value={totalBalance.toFixed(2)} />
          <Text
            label="Total Earnings"
            value={(currentUser?.totalEarnings).toFixed(2)}
          />
          <Text
            label="Referral Earnings (Added to ads wallet)"
            value={(currentUser?.totalReferralEarnings).toFixed(2)}
          />
        </div>
      </article>

      <div className="flex flex-col md:flex-row gap-6 justify-between mt-6 md:mt-12">
        <article className="w-full md:w-auto mx-auto hover:animate-background rounded-xl bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
          <div className="md:w-[500px]  flex flex-col gap-3 rounded-[10px] bg-white p-4 sm:p-6">
            <p className="text-lg md:text-xl font-semibold flex justify-center items-center my-4 text-black">
              Ads Wallet
            </p>
            <Text
              label="Total Ads Balance"
              value={(currentUser?.ads_wallet?.balance).toFixed(2)}
            />
            <Text
              label="Total Ads revenue"
              value={(currentUser?.ads_wallet?.life_time_ads_revenue).toFixed(
                2
              )}
            />
            <div className="flex justify-between gap-4 p-1 border rounded-lg">
              <p className="flex items-center text-base md:text-lg px-2">
                Transfer Amount to Game Wallet{" "}
              </p>
              <button
                type="button"
                onClick={openModal_trans_ads}
                className="rounded-md bg-purple-700 px-2 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Transfer
              </button>
            </div>
          </div>
        </article>
        <article className="w-full md:w-auto m mx-auto hover:animate-background rounded-xl bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
          <div className="md:w-[500px] flex flex-col gap-3 rounded-[10px] bg-white p-4 sm:p-6">
            <p className="text-lg md:text-xl font-semibold flex justify-center items-center my-4 text-black">
              {" "}
              Games Wallet{" "}
            </p>
            <Text
              label="Total Game Balance"
              value={(currentUser?.games_wallet?.balance).toFixed(2)}
            />
            <Text
              label="Total Game Prediction Earning"
              value={(currentUser?.games_wallet?.life_time_game_predict_earnings).toFixed(
                2
              )}
            />
            <div className="flex justify-between gap-4 p-1 border rounded-lg">
              <p className="flex items-center text-base md:text-lg px-2">
                Transfer Amount to Ads Wallet{" "}
              </p>
              <button
                type="button"
                onClick={openModal_trans_games}
                className="rounded-md bg-purple-700 px-2 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Transfer
              </button>
            </div>
          </div>
        </article>
      </div>

      <article className="max-w-screen-sm mx-auto hover:animate-background rounded-xl bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] mt-10 mb-section-gap-sm md:mb-section-gap">
        <div className="flex flex-col gap-3 rounded-[10px] bg-white p-4 sm:p-6">
          <p className="text-lg md:text-xl font-semibold flex justify-center items-center my-4 text-black">
            {" "}
            Today&apos;s Summary{" "}
          </p>
          <Text
            label="Earnings From Games"
            value={(currentUser?.todaysEarning?.earning_from_games).toFixed(2)}
          />
          <Text
            label="Earnings From Ads"
            value={(currentUser?.todaysEarning?.earning_from_ads).toFixed(2)}
          />

          <Text
            label="Earnings From Referral"
            value={(currentUser?.todaysEarning?.earning_from_referral).toFixed(
              2
            )}
          />

          {currentUser?.userinformation?.referrerReferralID && (
            <Text
              label="Referral Cost (3% of your daily Earnings)"
              value={(
                (currentUser?.todaysEarning?.earning_from_games +
                  currentUser?.todaysEarning?.earning_from_ads +
                  currentUser?.todaysEarning?.earning_from_referral) *
                0.03
              ).toFixed(2)}
            />
          )}
        </div>
      </article>

      {/* Ads transfer Modal */}
      <Transition appear show={isOpen_trans_ads} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal_trans_ads}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg md:text-xl font-semibold flex justify-center items-center my-4">
                    Transfer Amount to Games Wallet
                  </Dialog.Title>
                  <form onSubmit={handleTransferToGames}>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">Transfer Amount</label>
                      <input
                        type="number"
                        required
                        className="px-3 border p-1 w-full mb-4 rounded-lg"
                        value={gamesAmount}
                        onChange={(e) => setGamesAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">Selected Wallet</label>
                      <input
                        type="text"
                        required
                        className="px-3 border p-1 w-full mb-4 rounded-lg"
                        value="Ads Wallet"
                        disabled
                      />
                    </div>
                    <div className="mt-3">
                      <button
                        disabled={disabled}
                        type="submit"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                          disabled ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      >
                        Transfer
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* game transfer Modal */}
      <Transition appear show={isOpen_trans_games} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal_trans_games}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg md:text-xl font-semibold flex justify-center items-center my-4">
                    Transfer Amount to Ads Wallet
                  </Dialog.Title>
                  <form onSubmit={handleTransferToAds}>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">Transfer Amount</label>
                      <input
                        value={adsAmount}
                        onChange={(e) => setAdsAmount(e.target.value)}
                        type="number"
                        required
                        className="px-3 border p-1 w-full mb-4 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm">Selected Wallet</label>
                      <input
                        type="text"
                        required
                        className="px-3 border p-1 w-full mb-4 rounded-lg"
                        value="Games Wallet"
                        disabled
                      />
                    </div>

                    <div className="mt-3">
                      <button
                        disabled={disabled}
                        type="submit"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                          disabled ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      >
                        Transfer
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default Summary;
