'use client'

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Bkash from "../../public/images/bkash.png";
import Visa from "../../public/images/visa.png";
import Mastercard from "../../public/images/mastercard.png";
import Nogod from "../../public/images/nagad-seeklogo.com.svg";
import DutchBangla from "../../public/images/dutch-bangla-rocket-logo.png";
import DBBL from "../../public/images/dutch-bangla-bank-ltd-logo-96BD5A58D8-seeklogo.com.png";
import Heading from "../Heading";
import Container from "../Container";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const paymentLogos = [
  { src: Bkash, alt: "Bkash" },
  { src: Nogod, alt: "Nogod" },
  { src: DutchBangla, alt: "DutchBangla" },
  { src: DBBL, alt: "DBBL" },
  { src: Visa, alt: "Visa" },
  { src: Mastercard, alt: "Master Card" },
];

const PaymentSystem = () => {
  return (
    <section className="mb-sm-section-gap md:mb-section-gap">
      <Container>
        <Heading
          title="Our Payment Methods"
          subtitle="The type of payment system we use"
          center
        />

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper mt-8 md:mt-12 hover:cursor-pointer"
        >
          {paymentLogos.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="mb-8 flex items-center justify-center"
            >
              <Image src={logo.src} alt={logo.alt} width={150} height={100} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default PaymentSystem;
