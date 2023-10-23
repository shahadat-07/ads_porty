"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AdModal from "../ShowAds/AdModal";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

interface AdImage {
  id: string;
  imgUrl: string;
  exp: string;
}

const ShowAds: React.FC = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [adsData, setAdsData] = useState<AdImage[]>([]);
  const [adsPercentage, setAdsPercentage] = useState(0);
  const [seenAds, setSeenAds] = useState<Set<string>>(new Set());

  let token: string | null = cookies.get("jwt");
  const decode: DecodedToken | null = token ? jwt<DecodedToken>(token) : null;
  const id = decode?.id;

  useEffect(() => {
    if (id) {
      axios
        .get(`https://adsporty-server.onrender.com/currentUser/${id}`)
        .then((res) => {
          if (Array.isArray(res.data.data?.trackAdsView)) {
            setSeenAds(new Set(res.data.data?.trackAdsView));
          }
        })
        .catch((error) => {});
    }
  }, [id, adsPercentage, router]);

  useEffect(() => {
    axios
      .get("https://adsporty-server.onrender.com/admin/get-informations")
      .then((res) => {
        setAdsPercentage(res.data.data[0].ads_percentage_rate / 100);
        setAdsData(res.data.data[0].ad_images);
      })
      .catch((error) => {
        console.log('');
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8 mb-section-gap-sm md:mb-section-gap">
      {adsData
        .filter((ad) => !seenAds.has(ad.id))
        .map((ad: object, index: number) => (
          <div
            key={index}
            className="bg-white w-full shadow-md rounded-md p-4 max-w-xs mx-auto md:max-w-2xl"
          >
            {/* Ad content */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col itemes-center justify-center">
                <p className="text-gray-600">Duration:</p>
                <p className="text-gray-800 font-semibold">5 Seconds</p>
              </div>
              <div className="flex flex-col itemes-center justify-center">
                <p className="text-gray-600">Revenue: </p>
                {/* <p className="text-purple-600 font-semibold">${adsRevenue}</p> */}
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
      {/* {adsData.map((ad: any, index: number) => (
        <AdModal
          key={index}
          isOpen={modalIndex === index}
          onClose={() => setModalIndex(null)}
          ad={ad}
          // adsRevenue={adsRevenue}
          userId={id}
        />
      ))} */}
    </div>
  );
};

export default ShowAds;
