import React, { useState } from "react";
import {
  SelectMulti,
  ProxySecret,
  Threat,
  Schema,
  Config,
  Version,
} from "../components";
import { makeStyles } from "@mui/styles";
import { Box, Stack, Typography, Paper } from "@mui/material";
import ReactGA from "react-ga4";

const GatewayTab: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);

  const classes = useStyles();
  ReactGA.send({ hitType: "pageview", page: "/gatewayTab" });

  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <div className={classes.container}>
          <div className={classes.box}>
            <div className={classes.con}>
              <form>
                <div className={classes.gateway}>
                  <div
                    className={classes.way}
                    style={{
                      opacity: disabled ? 0.25 : 1,
                      pointerEvents: disabled ? "none" : "initial",
                    }}>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "black",
                        fontSize: "16px",
                        display: "block",
                        boxSizing: "border-box",
                        outline: "none 0px",
                        letterSpacing: "normal",
                        lineHeight: "24px",
                      }}>
                      Gateway DNS
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "black",
                        fontSize: "12px",
                        display: "block",
                        boxSizing: "border-box",
                        outline: "none 0px",
                        letterSpacing: "normal",
                        lineHeight: "16px",
                      }}>
                      The gateway developers use to make request to the API.
                    </span>
                  </div>
                  <div
                    className={classes.dropdown}
                    style={{
                      opacity: disabled ? 0.25 : 1,
                      pointerEvents: disabled ? "none" : "initial",
                    }}>
                    <SelectMulti />
                  </div>
                  <div className={classes.fire}>
                    <div className={classes.wall}>
                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: 600,
                          color: "black",
                          fontSize: "16px",
                          display: "block",
                          boxSizing: "border-box",
                          outline: "none 0px",
                          letterSpacing: "normal",
                          lineHeight: "24px",
                        }}>
                        Firewall Settings
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          marginTop: "8px",
                          fontWeight: "600px",
                          color: "rgba(0, 0, 0, 0.6)",
                          fontSize: "12px",
                          display: "block",
                          boxSizing: "border-box",
                          outline: "none 0px",
                          letterSpacing: "normal",
                          lineHeight: "16px",
                        }}>
                        Protect your API by blocking requests that are not from
                        the ZAPI infrastructure. ZAPI adds the
                        “X-ZAPI-Proxy-Secret” header on every request. This
                        header has a unique value for each API.
                      </Typography>
                    </div>
                  </div>
                  <ProxySecret />
                </div>
                <Threat />
                {/* <Schema /> */}
                {/* <Config />
                        <Version /> */}

                <Box>
                  <Stack direction="row" spacing={2} mt={5}>
                    <button className={classes.saveBtn}>Save</button>
                    <button className={classes.discardBtn}>Discard</button>
                  </Stack>
                </Box>
              </form>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};
const useStyles = makeStyles({
  paper: {
    width: "950px",
    marginTop: "20px",
    padding: "2rem 2rem",
  },
  container: {
    overflow: "auto",
    flex: "1 1 0%",
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
  box: {
    height: "100%",
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
  con: {
    padding: "32px 24px",
    overFlowY: "auto",
    boxSizing: "border-box",
  },
  gateway: {
    width: "688px",
    boxSizing: "border-box",
  },
  way: {
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
    gap: "1rem",
  },
  dropdown: {
    marginTop: "16px",
    boxSizing: "border-box",
  },
  fire: {
    marginTop: "32px",
    boxSizing: "border-box",
  },
  wall: {
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
    textAlign: "justify",
  },
  fixedBottom: {
    width: "100%",
    borderTop: "1px solid rgb(214, 217, 219)",
    position: "fixed",
    bottom: 0,
    padding: "20px",
    zIndex: 100,
    backgroundColor: "#F3F4F6",
  },
  saveBtn: {
    padding: "15px 25px",
    backgroundColor: "rgb(74, 149, 237)",
    color: "white",
    borderRadius: "5px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  discardBtn: {
    padding: "15px 25px",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: "#fff",
    border: "1px solid rgb(214, 217, 219)",
    color: "rgba(0, 0, 0, 0.87)",
  },
});

export default GatewayTab;
