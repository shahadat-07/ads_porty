import Deposit from "@/components/Deposit/Deposit";
import React from "react";
import getSiteInformations from "../actions/getSiteInformations";
import getCurrentUser from "../actions/getCurrentUser";
import getAllUsers from "../actions/getAllUsers";
const page = async () => {
  const siteInformations = await getSiteInformations();
  const currentUser = await getCurrentUser();
  const allUsers = await getAllUsers();

  return (
    <Deposit
      siteInformations={siteInformations.data[0]}
      currentUser={currentUser.data}
      allUsers={allUsers.data}
    />
  );
};

export default page;
