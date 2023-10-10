import React from "react";

import getSiteInformations from "@/app/actions/getSiteInformations";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ShowAds from "@/components/ShowAds/ShowAds";
import Table from "@/components/PredictionHistory/Table";
import WalletHistory from "@/components/Wallet/WalletHistory";

const page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <section className="pt-28 p-5 min-h-[70vh]">
      <Container>
        <WalletHistory transactionHistory={currentUser?.data?.transactionHistory} />
      </Container>
    </section>
  );
};

export default page;
