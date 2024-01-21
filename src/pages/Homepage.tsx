import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  Education,
  Hero,
  HomeNavbar,
  Features,
  Footer,
  Pricing,
  Brand,
  MarketPlace,
} from "../sections";
import ReactGA from "react-ga4";
import Modalpopup from "../components/Modal";
import Feedback from "../sections/Feedback";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { SvgIcon } from "@mui/material";
import {
  MainButton,
  ChildButton,
  FloatingMenu,
  Directions,
} from "../components/FloatingMenu";

const Homepage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  ReactGA.send({ hitType: "pageview", page: "/" });

  const SlackIcon = (props: any) => {
    return (
      <SvgIcon {...props} viewBox="0 0 54 54">
        <path
          fill="#36C5F0"
          d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
        />
        <path
          fill="#2EB67D"
          d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
        />
        <path
          fill="#ECB22E"
          d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
        />
        <path
          fill="#E01E5A"
          d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
        />
      </SvgIcon>
    );
  };

  return (
    <div className={classes.homePage}>
      <Modalpopup open={open} setOpen={setOpen} handleClose={handleClose} />
      <HomeNavbar />
      <Hero />
      <Brand />
      <MarketPlace />
      <Features />
      {/* <Feedback handleOpen={handleOpen}/> */}
      <Pricing />
      <Education />
      <FloatingMenu
        slidespeed={500}
        isOpen={isOpen}
        spacing={1}
        direction={Directions.Up}>
        <MainButton
          isOpen={isOpen}
          background="#081F4A"
          iconResting={
            <SupportAgentIcon
              sx={{ fontSize: 30, background: "transparent" }}
            />
          }
          iconActive={
            <RemoveCircleOutlineIcon
              sx={{ fontSize: 25, background: "transparent" }}
            />
          }
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          size={56}
        />
        <ChildButton
          icon={
            <WhatsAppIcon sx={{ fontSize: 25, background: "transparent" }} />
          }
          background="green"
          size={40}
          onClick={() => {
            window.open("https://wa.me/+2348163816789", "_blank");
          }}
        />
        <ChildButton
          icon={<Feedback handleOpen={handleOpen} />}
          background="#fff"
          size={40}
          // onClick={() => handleOpen}
        />
        <ChildButton
          icon={<SlackIcon sx={{ fontSize: 25, background: "transparent" }} />}
          background="white"
          size={40}
          onClick={() => {
            window.open(
              "https://join.slack.com/t/zapiai/shared_invite/zt-1kww5mt4y-tcAsNc2SIJYtVFz3nxaV_Q",
              "_blank"
            );
          }}
        />
      </FloatingMenu>
      <Footer />
    </div>
  );
};

export default Homepage;

const useStyles = makeStyles({
  homePage: {
    height: "100%",
    width: "100%",
    fontFamily: "Space Grotesk, sans-serif",
    background: "#fff",
  },
  feedback: {
    position: "fixed",
    bottom: "1%",
    right: "1%",
    background: "yellow",
    "@media screen and (max-width: 400px)": {
      position: "fixed",
      bottom: "1%",
      right: "1%",
    },
  },
  main: {
    backgroundColor: "#ffff",
    "@media screen and (max-width: 400px)": {
      padding: "1rem .5rem",
    },
  },
});
