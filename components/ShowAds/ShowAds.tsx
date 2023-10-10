"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import AdModal from "./AdModal";
import { useRouter } from "next/navigation";
import { User } from "@/const";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdImage {
  id: string;
  imgUrl: string;
  exp: string;
}

interface ShowAdsProps {
  currentUser: User | null;
}

const ShowAds: React.FC<ShowAdsProps> = ({ currentUser }) => {
  // console.log(currentUser?.notifications);
  const router = useRouter();
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [adsData, setAdsData] = useState<AdImage[]>([]);
  // console.log(adsData)
  const [adsRevenue, setAdsRevenue] = useState(0);
  const [seenAds, setSeenAds] = useState<Set<string>>(new Set());
  const seenAdsLength = seenAds.size;

  function getDate() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day <= 9 ? `0${day}` : day;
    const formattedDate = `${formattedDay}-${monthIndex}-${year}`;
    return formattedDate;
  }

  function getTimeLocal() {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
  }

  const todaysDate = getDate();

  const filteredNotifications = currentUser?.notifications.filter(
    (notification) => {
      const currentTime = getTimeLocal();
      // console.log("Current Time", currentTime);
      const [hours1, minutes1, seconds1] = currentTime.split(":").map(Number);
      const currentTimeMilliSeconds =
        ((hours1 * 60 + minutes1) * 60 + seconds1) * 1000;
      // console.log("Current time in mili seconds", currentTimeMilliSeconds);

      const [hours, minutes, seconds] = notification.time
        .split(":")
        .map(Number);

      const userNotificationTime =
        ((hours * 60 + minutes) * 60 + seconds) * 1000;

      // console.log("User time", notification.time);
      // console.log("User time in milli seconds", userNotificationTime);

      const timeDifference = currentTimeMilliSeconds - userNotificationTime;
      // console.log("timeDifference", timeDifference);

      // Check if the notification is from today and less than 1 hour old (3600000 milliseconds)
      return notification.date === todaysDate && timeDifference <= 3600000;
    }
  );

  // console.log(filteredNotifications);

  // useEffect(() => {
  //   if (filteredNotifications && filteredNotifications.length > 0) {
  //     const notificationMessages = filteredNotifications.map(
  //       (notification, index) => (
  //         <div key={index} className="">
  //           {toast.success(notification.message, {
  //             autoClose: false,
  //             closeButton: true,
  //             // position: toast.POSITION.TOP_CENTER,
  //             // className: "mb-[100px]!"
  //           })}
  //         </div>
  //       )
  //     );
  //   }
  // }, []);

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day <= 9 ? `0${day}` : day;
    const todaysDate = `${formattedDay}-${monthIndex}-${year}`;

    axios
      .post("https://server.adsporty.com/calculate-ads-revenue", {
        userId: currentUser?._id,
      })
      .then((res) => {
        const currentAdRevenue = res.data.data.trackAdRevenue.find(
          (item: any) => item.date === todaysDate
        );

        if (currentAdRevenue) {
          setAdsRevenue(currentAdRevenue.revenue);
        } else {
          console.log("");
        }
      })
      .catch((error) => {
        // console.log(error);
      });

    axios
      .get("https://server.adsporty.com/admin/get-informations")
      .then((res) => {
        setAdsData(res.data.data[0].ad_images);
      })
      .catch((error) => {
        // console.log(error);
      });

    if (Array.isArray(currentUser?.trackAdsView)) {
      setSeenAds(new Set(currentUser?.trackAdsView));
    }
  }, [currentUser?._id, currentUser?.trackAdsView]);

  return (
    <>
    

      {adsData.length > 0 ? (
        seenAdsLength === adsData.length ? (
          <p className="text-sm md:text-base font-semibold text-green-600 text-center my-2 md:my-5">
            Thank you for engaging with our ads today. You&apos;ve successfully
            viewed all available advertisements for the day. We appreciate your
            participation. Please check back tomorrow for new ads and
            opportunities to earn rewards. Your continued support is valued, and
            we look forward to your return!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8 mb-section-gap-sm md:mb-section-gap">
            {adsData
              .filter((ad) => !seenAds.has(ad.id))
              .map((ad, index) => (
                <div
                  key={index}
                  className="bg-white w-full shadow-md rounded-md p-4 max-w-xs mx-auto md:max-w-2xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-600">Duration:</p>
                      <p className="text-gray-800 font-semibold">5 Seconds</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-600">Revenue: </p>
                      <p className="text-purple-600 font-semibold">
                        ${adsRevenue}
                      </p>
                    </div>
                    <button
                      className="bg-purple-600 text-white py-2 px-2 md:px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 transition duration-150"
                      onClick={() => setModalIndex(index)}
                    >
                      Show Ads
                    </button>
                  </div>
                </div>
              ))}

            {adsData
              .filter((ad) => !seenAds.has(ad.id))
              .map((ad, index) => (
                <AdModal
                  key={index}
                  isOpen={modalIndex === index}
                  onClose={() => setModalIndex(null)}
                  ad={ad}
                  adsRevenue={adsRevenue}
                  userId={currentUser?._id}
                />
              ))}
          </div>
        )
      ) : (
        <p className="text-xl md:text-2xl font-semibold text-red-600 text-center my-2 md:my-5">
          No Ads to Show. Please Hold On!
        </p>
      )}
    </>
  );
};

export default ShowAds;
