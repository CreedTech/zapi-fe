import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  FOOTER_LINKS,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../assets";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Stack direction="row" width="100%" flexWrap="wrap">
        {FOOTER_LINKS.map((item, index) => (
          <div key={index} className={classes.container}>
            <>
              <Typography
                fontSize="16px"
                fontWeight={700}
                lineHeight="14px"
                color="#FFEA00"
                mb={2}>
                {item.title}
              </Typography>
              {item.links.map((link, index) => (
                <Link key={index} to={`/${link.link}`}>
                  <Typography
                    fontSize="14px"
                    fontWeight={300}
                    lineHeight="8px"
                    color="#ffffff"
                    my={2}>
                    {link.name}
                  </Typography>
                </Link>
              ))}
            </>
          </div>
        ))}
      </Stack>
      <div className={classes.divider} />
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between">
        <Typography
          fontSize="14px"
          fontWeight={900}
          lineHeight="30px"
          color="#FFEA00">
          &copy; {new Date().getFullYear()} ZAPI
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <a
            href="https://twitter.com/zummitafrica"
            target="_blank"
            rel="noopener noreferrer">
            <img src={TwitterIcon} alt="twitter logo" />
          </a>
          <a
            href="https://linkedin.com/company/zummit-africa/"
            target="_blank"
            rel="noopener noreferrer">
            <img src={LinkedInIcon} alt="linkedin logo" />
          </a>
          <a
            href="https://youtube.com/channel/UC64g6K2pxfFwbFufOCcTJfQ"
            target="_blank"
            rel="noopener noreferrer">
            <img src={YoutubeIcon} alt="youtube logo" />
          </a>
        </Stack>
      </Stack>
    </footer>
  );
};

const useStyles = makeStyles({
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#081F4A",
    padding: "2rem 4rem",
  },
  container: {
    width: "300px",
    height: "fit-content",
    margin: "0 0 1rem",
  },
  icon: {
    fill: "#FFEA00",
  },
  divider: {
    width: "100%",
    height: "1px",
    background: "#d4d4d4",
    marginBottom: "1rem",
  },
});

export default Footer;
