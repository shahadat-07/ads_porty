"use client";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Signup from "@/components/Signup/Signup";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const page = () => {
  return (
    <section className="mb-section-gap-sm md:mb-section-gap">
      <Container>
        <Link
          href="/"
          className="flex items-center gap-1 pt-24 text-purple-700 font-bold text-xl"
        >
          <FaArrowLeft className="" />
          Back
        </Link>
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </Container>
    </section>
  );
};

export default page;
