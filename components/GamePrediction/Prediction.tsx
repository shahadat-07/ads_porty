import React from "react";
import Heading from "../Heading";
import Container from "../Container";
import Table from "../PredictionHistory/Table";
import ShowAds from "../ShowAds/ShowAds";
import BettingCard from "./BettingCard";
import Loader from "../Loader";
import getSiteInformations from "@/app/actions/getSiteInformations";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ToastContainer, toast } from "react-toastify";

const Prediction = async () => {
  const siteInformations = await getSiteInformations();
  const currentUser = await getCurrentUser();

  return (
    <section className="pt-28 p-5 min-h-[70vh]">
      <Container>
        <Heading title="Let's Earn With Ads" center />
        <div className="mb-section-gap">
          <ShowAds currentUser={currentUser.data} />
        </div>
        <Heading title="Today's Game Prediction" center />
        {siteInformations ? (
          <BettingCard
            currentUser={currentUser.data}
            siteInformations={siteInformations.data[0]}
          />
        ) : (
          <div>
            <Loader />
          </div>
        )}
        <Heading title="Game Prediction History" center />
        <Table currentUser={currentUser.data} />
      </Container>
      <ToastContainer className="mb-[100px]" />
    </section>
  );
};

export default Prediction;
