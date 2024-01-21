import React, { useEffect, useState } from "react";
import { useContextProvider } from "../contexts/ContextProvider";
import {
  Box,
  Grid,
  List,
  Link,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Navbar } from "../components";
import { makeStyles } from "@mui/styles";
import { LOGINHISTORIES } from "../testdata";
import { loadMapApi } from "../utils";
import Map from "../components/Map";
import ReactGA from "react-ga4";

const LoginHistory: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const classes = useStyles();
  const { setActiveMenu, screenSize, setScreenSize } = useContextProvider();

  ReactGA.send({ hitType: "pageview", page: "/login-history" });
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);
  useEffect(() => {
    const handleScreenResize = () => setScreenSize(innerWidth);
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    screenSize <= 900 ? setActiveMenu(false) : null;
  }, [screenSize]);

  return (
    <>
      <Navbar />
      <Box>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "2rem" }}></Typography>
        <Typography variant="h6" mx={2} my={1}>
          Login History
        </Typography>
        <Stack>
          <Toolbar
            style={{
              color: "white",
              backgroundColor: "hsla(219, 80%, 16%, 0.7)",
            }}>
            <Grid container>
              <Grid item xs={12} md={5}>
                <Typography variant="h6">Date & Time</Typography>
              </Grid>
              <Grid item xs={0} md={7}>
                <Typography variant="h6">Your Location</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </Stack>
        <Stack>
          <Grid container>
            <Grid item xs={12} md={3}>
              <div className={classes.root}>
                <List className={classes.list}>
                  {LOGINHISTORIES.map((loginHistory, index) => (
                    <Link key={index}>
                      <ListItem>{loginHistory}</ListItem>
                    </Link>
                  ))}
                </List>
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              {scriptLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  mapTypeControl={true}
                />
              )}
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "max-content",
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    background: "transparent",
    textAlign: "center",
    // padding: "0 0.25rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    backgroundColor: " hsla(219, 80%, 16%, 0.3)",
    "&Map": {
      textDecoration: "none",
      cursor: "pointer",
    },
    "& li": {
      color: "white",
      transititon: "1s all ease",
      alignItems: "center",
      textAlign: "center",
      textTransform: "capitalize",
      "&:hover": {
        // color: "var(--color-secondary)",
        transform: "translateX(-8px)",
      },
    },
  },
  mapResponsive: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: "0",
    "& iframe": {
      // left: "0",
      top: "0",
      height: "100%",
      width: "80%",
      position: "absolute",
    },
  },
});

export default LoginHistory;
