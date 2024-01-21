import React from "react";

import { HomeNavbar, ComingSoon, Footer } from "../sections";
import ReactGA from "react-ga4";

const Pricing: React.FC = () => {
  ReactGA.send({ hitType: "pageview", page: "/pricing" });

  return (
    <>
      <HomeNavbar />
      <ComingSoon />
      <Footer />
    </>
  );
};

export default Pricing;
