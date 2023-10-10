"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import Login from "@/components/Login/Login";
import SecurityLayout from "@/components/SecurityLayer";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const page = () => {
  return (
    <section className="mb-section-gap-sm md:mb-section-gap">
      <SecurityLayout>
        <Container>
          <Link
            href="/"
            className="flex items-center gap-1 pt-24 text-purple-700 font-bold text-xl"
          >
            <FaArrowLeft className="" />
            Back
          </Link>
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login />
        </Container>
      </SecurityLayout>
    </section>
  );
};

export default page;
