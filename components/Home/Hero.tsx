import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-50 pt-20">
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
            The Future of Online Work is Here
            <span className="text-purple-700"> Start Earning </span>
            Online Today
          </h1>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
            Earn money by watching ads and playing games. Predict the outcome of
            events to earn even more. The more you earn, the higher your level.
            Level up to unlock new features and earn even more.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href="/signup"
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 bg-purple-700 transition duration-150 ease-in-out hover:bg-purple-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-purple-700 py-2 sm:py-4 text-sm"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 bg-transparent transition duration-150 ease-in-out hover:border-purple-600 lg:text-xl lg:font-bold  hover:text-purple-600 rounded border border-purple-700 text-purple-700 px-4 sm:px-10 py-2 sm:py-4 text-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
