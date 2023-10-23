"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface AdImage {
  id: string;
  imgUrl: string;
  exp: string;
}

const AdModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  ad: AdImage;
  adsRevenue: number;
  userId: string | undefined;
}> = ({ isOpen, onClose, ad, adsRevenue, userId }) => {
  // console.log(ad);
  const router = useRouter();
  const [timer, setTimer] = useState(5);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // console.log(ad.id)

  useEffect(() => {
    // Start the countdown when the modal opens
    if (isOpen) {
      const countdown = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(countdown);
          setButtonDisabled(false); // Enable the close button
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [isOpen, timer]);

  // Handle ads revenue add to database
  const handleClose = async (id: string) => {
    const apiEndpoint = "https://adsporty-server.onrender.com/add-ad-revenue";

    // console.log("this is game id", id);

    try {
      const response = await axios.post(apiEndpoint, {
        adId: id,
        revenue: adsRevenue,
        userId: userId,
      });
      toast.success(response.data.message);
      router.refresh();
      // setTimeout(() => {
      // }, 500);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong!");
      }
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Duration: 5 seconds</p>
                </div>
                <div className="mt-4">
                  <Image
                    className="rounded-lg"
                    src={ad?.imgUrl}
                    width={500}
                    height={300}
                    alt="Ads Image"
                  />
                  <p className="mt-4">
                    {buttonDisabled
                      ? `Please se the ads for ${timer} seconds.`
                      : ""}
                  </p>
                  <button
                    className={`bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 mt-4 ${
                      buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleClose(ad?.id)}
                    disabled={buttonDisabled}
                  >
                    Marked As Seen
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AdModal;
