import React from "react";

import { HomeNavbar, Footer, APIHubTab, APIHubHero } from "../sections";
import ReactGA from "react-ga4";

ReactGA.send({ hitType: "pageview", page: "/api-hub" });

const APIHub: React.FC = () => {
  return (
    <>
      <HomeNavbar />
      <APIHubHero />
      <APIHubTab />
      <Footer />
    </>
  );
};

export default APIHub;
