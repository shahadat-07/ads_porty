"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import Navbar from "@/components/Home/Navbar/Navbar";
import Contact from "@/components/Home/contact/Contact";
import Login from "@/components/Login/Login";
import SecurityLayout from "@/components/SecurityLayer";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
const page = () => {
  return (
    <section className="pt-[100px] z-0 bg-gray-50">
 
      <Contact />
    </section>
  );
};

export default page;
