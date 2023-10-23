import React from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Home/Hero";
import PaymentSystem from "@/components/Home/PaymentSystem";
import Tutorial from "@/components/Home/Tutorial";
import Contact from "@/components/Home/contact/Contact";
import Prediction from "@/components/GamePrediction/Prediction";
import getCurrentUser from "./actions/getCurrentUser";

const Page = async () => {
  const loading = false;
  const currentUser = await getCurrentUser();

  return (
    <>
      {loading ? (
        <Loader />
      ) : currentUser ? (
        currentUser?.data?.userinformation?.isBlocked ? (
          <section className="bg-white dark:bg-gray-900 ">
            <div className="container flex items-center h-[50vh] md:min-h-screen px-6 py-12 mx-auto">
              <div className="flex flex-col items-center max-w-2xl mx-auto text-center border-2 border-red-500 rounded-md p-2 md:p-5">
                <h1
                  className="mt-3 text-2xl font-semibold
                 text-gray-800  md:text-4xl mb-3 md:mb-5"
                >
                  Your account has been blocked!
                </h1>
                <p className="text-lg md:text-xl">
                  Please contact support for assistance.{" "}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <Prediction />
        )
      ) : (
        <>
          <Hero />
          <Tutorial />
          <PaymentSystem />
          <Contact />
        </>
      )}
    </>
  );
};

export default Page;
