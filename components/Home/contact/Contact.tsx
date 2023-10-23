"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Design from "./Design";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    details: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://adsporty-server.onrender.com/send-mail", formData)
      .then((res) => {
        toast.success(
          "We have Recieved your message. We will contact with you soon!"
        );

        setFormData({
          name: "",
          phone: "",
          details: "",
        });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <section
        id="contact"
        className="bg-gray-50 py-12 lg:py-42 overflow-hidden relative z-10"
      >
        <Container>
          <Heading title="GET IN TOUCH WITH US" center />
          <div className="flex flex-wrap -mx-4 lg:justify-between mt-16 pb-10 md:pb-20">
            <div className="w-full xl:w-2/3 px-4 mx-auto">
              <div className="relative p-8 bg-white rounded-lg shadow-lg sm:p-12">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      required
                      type="text"
                      placeholder="Your Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <textarea
                      required
                      placeholder="Your Message"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="border-[f0f0f0] w-full resize-none rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none"
                    />
                  </div>
                  <div>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`w-full p-3 text-black hover:bg-black hover:text-white transition border rounded border-primary bg-primary hover:bg-opacity-90 ${
                        isLoading ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                <Design />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
