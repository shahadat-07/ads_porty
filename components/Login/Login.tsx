"use client";

import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fields } from "@/const";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export default function Login() {
  const cookies = new Cookies();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    axios
      .post("https://adsporty-server.onrender.com/login", formData)
      .then((res) => {
        const token = res.data.token;
        const decoded = jwt(token) as { exp: number };
        cookies.set("jwt", token, {
          expires: new Date(decoded.exp * 1000),
        });
        toast.success("Successfully logged in");
        setTimeout(function () {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error: any) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleLogin}>
      {fields.map((field) => (
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
        </div>
      ))}
      <div className="flex">
        <button
          disabled={isLoading}
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </div>
    </form>
  );
}
