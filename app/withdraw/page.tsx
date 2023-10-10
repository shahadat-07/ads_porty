import Withdraw from "@/components/Withdraw/Withdraw";
import React from "react";
import getSiteInformations from "../actions/getSiteInformations";
import getCurrentUser from "../actions/getCurrentUser";

const page = async () => {
  const siteInformation = await getSiteInformations();
  const currentUser = await getCurrentUser();

  return (
    <Withdraw
      siteInformation={siteInformation.data[0]}
    />
  );
};

export default page;
