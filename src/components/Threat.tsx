import React, { useState, FormEvent } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const Threat: React.FC = () => {
  const classes = useStyles();
  const [threatProtection, setThreatProtection] = useState<boolean>(false);
  const [countDisabled, setCountDisabled] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  // const toogleThreatProtection = () => {
  // 	setThreatProtection(prevState => {
  // 		return !prevState;
  // 	});
  // }

  const disableClick = (e: FormEvent) => {
    e.preventDefault();
    setCountDisabled(!countDisabled);
  };
  return (
    <div
      className={classes.threat}
      style={{
        opacity: disabled ? 0.25 : 1,
        pointerEvents: disabled ? "none" : "initial",
      }}>
      <div className={classes.text}>
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
          Threat Protection
        </Typography>
      </div>
      <div className={classes.field}>
        <div className={classes.subfield}>
          <div className={classes.textfield}>
            <Typography
              variant="h6"
              style={{
                fontWeight: 600,
                color: "black",
                fontSize: "14px",
                display: "block",
                boxSizing: "border-box",
                outline: "none 0px",
                letterSpacing: "normal",
                lineHeight: "20px",
              }}>
              Protects API from SQL or Javascript injection attacks
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginTop: "4px",
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
                display: "block",
                boxSizing: "border-box",
                outline: "none 0px",
                letterSpacing: "normal",
                lineHeight: "16px",
              }}>
              Automatically compare the paths, parameters, headers, and body
              (application/json, application/x-www-form-urlencoded, and
              non-binary data in multipart/form-data only) of all requests
              against pre-defined RegEx patterns, and block matching requests
              from reaching your servers
            </Typography>
            <>
              {threatProtection ? (
                <div className={classes.main}>
                  <ToggleOnIcon
                    fontSize="large"
                    onClick={disableClick}
                    className={classes.pointer}
                  />{" "}
                </div>
              ) : (
                <div className={classes.main}>
                  <ToggleOffIcon
                    fontSize="large"
                    onClick={disableClick}
                    className={classes.pointer}
                  />
                </div>
              )}

              {threatProtection && (
                <>
                  <div className={classes.line}></div>
                  <div className={classes.subfield}>
                    <div className={classes.textfield}>
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
                        Threat protection requires the “Content-Type” header in
                        requests with a body. Requests with a body that do not
                        specify a “Content-Type” header will be blocked.
                      </Typography>
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  threat: {
    marginTop: "32px",
    boxSizing: "border-box",
  },
  text: {
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
  field: {
    marginTop: "16px",
    width: "fit-content",
    height: "fit-content",
    borderColor: "rgb(214, 217, 219)",
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: "1px",
    boxSizing: "border-box",
  },
  subfield: {
    padding: "16px",
    webkitBoxAlign: "center",
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
  },
  textfield: {
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
    textAlign: "justify",
    verticalAlign: "1rem",
  },
  main: {
    marginLeft: "16px",
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    position: "relative",
  },
  pointer: {
    cursor: "pointer",
  },
  line: {
    boxSizing: "border-box",
    height: "1px",
    width: "100%",
    borderTop: "1px solid rgb(214, 217, 219)",
  },
});

export default Threat;
