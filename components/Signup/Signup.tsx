"use client";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Registrationfields } from "@/const";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const Signup: React.FC = () => {
  const router = useRouter();
  const cookies = new Cookies();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "confirm_password") {
      if (formData["password"] !== value) {
        setPasswordError("The password doesn't match.");
      } else {
        setPasswordError("");
      }
    }

    if (name === "phonenumber") {
      const phoneNumber = value;
      if (phoneNumber.length > 13 || phoneNumber.length < 11) {
        setPhoneNumberError("Input a valid phone number");
      } else {
        setPhoneNumberError("");
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError || phoneNumberError) {
      toast.error("Please fix the validation error!");
      return;
    }
    setIsLoading(true);

    axios
      .post("https://server.adsporty.com/signup", formData)
      .then((res) => {
        const token = res.data.token;
        const decoded = jwt(token) as { exp: number };
        cookies.set("jwt", token, {
          expires: new Date(decoded.exp * 1000),
        });
        toast.success("Successfully Registered");
        setTimeout(function () {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error: any) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage, {
            duration: 5000,
          });
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      {Registrationfields.map((field) => (
        <div key={field.id} className="mb-4">
          <input
            type={field.type}
            id={field.id}
            name={field.name}
            autoComplete={field.autoComplete}
            required={field.isRequired}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="p-2 block w-full rounded-md border border-gray-300"
          />
          {field.name === "phonenumber" && phoneNumberError && (
            <span className="text-red-500">{phoneNumberError}</span>
          )}
          {field.name === "confirm_password" && passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
        </div>
      ))}

      <div className="flex">
        <button
          disabled={isLoading}
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
