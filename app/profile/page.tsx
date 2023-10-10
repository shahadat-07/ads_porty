/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import jwt from "jwt-decode";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import Container from "@/components/Container";
import Nav from "@/components/Home/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";


interface User {
  name: string;
  username: string;
  phonenumber: string;
  referralID: string;
  referrerReferralID: string;
  password: string;
  passwordChangedAt: string;
}
interface UpdatedUser {
  password: string;
  old_password: string;
  confirm_password: string;
}

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const[ passErr, setPassErr ] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for showing/hiding the update form
  const [formData, setFormData] = useState<UpdatedUser>({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const decoded: { id: string } | null = token ? jwt(token) : null;
  const id = decoded?.id;

  useEffect(() => {
    axios
      .get(`https://server.adsporty.com/currentUser/${id}`)
      .then((res) => {
        setCurrentUser(res.data.data.userinformation);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('');
      });
  }, [id]);

  // Function to handle the update form submission
  const handleUpdate = async () => {
    setDisabled(true);
  
    if (formData?.password !== formData?.confirm_password) {
      setPassErr(true);
      setDisabled(false);
      return;
    }
  
    try {
      const response = await axios.patch(`https://server.adsporty.com/updateMyPassword/${id}`, formData);
      toast.success(response.data.message);
      setIsEditing(false);
    } catch (error: any) {
      console.log('')
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      }  else {
        toast.error("An error occurred. Please try again later.");
      }
      setDisabled(false);
    }
  };
  


  return (
    <section className="mb-section-gap-sm md:mb-section-gap">
      {/* <Nav /> */}
      <div className="pt-[100px]">
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {currentUser && (
                <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Details and information about{" "}
                      {currentUser?.name || "Loading..."}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div
                        className={`${"bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser?.name || "N/A"}
                        </dd>
                      </div>
                      <div
                        className={`${"bg-white"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          Username
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser?.username || "N/A"}
                        </dd>
                      </div>
                      <div
                        className={`${"bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          Phone Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser?.phonenumber || "N/A"}
                        </dd>
                      </div>
                      <div
                        className={`${"bg-white"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          Referral ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser?.referralID || "N/A"}
                        </dd>
                      </div>
                      <div
                        className={`${"bg-white"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          Refferer Referral ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser?.referrerReferralID || "N/A"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {isEditing ? (
                <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto mt-4">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Update Password
                    </h3>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Old Password
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="password"
                            value={formData?.old_password || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                old_password: e.target.value,
                              })
                            }
                            className="border rounded-md py-1 px-2 w-full"
                          />
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          New Password
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="password"
                            value={formData?.password || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            className="border rounded-md py-1 px-2 w-full"
                          />
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Confirm New Password
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="password"
                            value={formData?.confirm_password || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirm_password: e.target.value,
                              })
                            }
                            className="border rounded-md py-1 px-2 w-full"
                          />
                          {
                            passErr && <p className="text-sm text-red-600 mt-2"> The confim password doesn&apos;t match </p>
                          }
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      onClick={handleUpdate}
                      className={`bg-purple-500 text-white px-4 py-2 rounded-md                     ${disabled ? 'cursor-not-allowed' : ''}
                      `}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <button
                    
                    className="bg-purple-500 text-white px-4 py-2 mt-4 rounded-md 
                    hover:cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    Update Password
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </section>
  );
};

export default UserProfile;
