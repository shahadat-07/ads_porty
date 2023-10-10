import Heading from "@/components/Heading";
import { useState } from "react";
import Navbar from "@/components/Home/Navbar/Navbar";
import WalletHistory from "@/components/Wallet/WalletHistory";
import Summary from "@/components/Wallet/Summary";
import getCurrentUser from "../actions/getCurrentUser";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Summary currentUser={currentUser?.data} />
    </>
  );
};

export default page;
