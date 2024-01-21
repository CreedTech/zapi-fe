import React, { SyntheticEvent, useState } from "react";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ContentCopy } from "@mui/icons-material";

const ProxySecret: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { userApis } = useAppSelector((store) => store.user);

  const api = userApis.find((api) => api?.id === id);

  const [proxySecret, setProxySecret] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toogleProxySecret = () => {
    setProxySecret((prevState) => {
      return !prevState;
    });
  };

  const copyButton = (e: SyntheticEvent, secretKey: string) => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className={classes.proxy}>
      <div className={classes.pro}>
        <Typography>X-ZAPI-Proxy-Secret</Typography>

        <div className={classes.border}>
          <>
            <div className={classes.input}>
              {" "}
              {proxySecret ? api?.secretKey : "****************************"}
            </div>

            {proxySecret ? (
              <VisibilityOffIcon
                onClick={toogleProxySecret}
                className={classes.pointer}
              />
            ) : (
              <VisibilityIcon
                onClick={toogleProxySecret}
                className={classes.pointer}
              />
            )}
          </>
        </div>
        <div className={classes.whitelist}>
          <div className={classes.text}>
            <Typography
              variant="h6"
              style={{
                color: "black",
                fontSize: "14px",
                display: "block",
                boxSizing: "border-box",
                outline: "none 0px",
                letterSpacing: "normal",
                lineHeight: "16px",
              }}>
              Whitelist ZAPI IPs to allow request only from ZAPI.
            </Typography>
          </div>
        </div>
      </div>
      {/* <button className={classes.button}>
        <div className={classes.copy}>Copy</div>
      </button> */}
      <div className="">
        {copied === false ? (
          <Button onClick={(e) => copyButton(e, api!.secretKey)}>
            <ContentCopy />
          </Button>
        ) : (
          <Button>Copied!</Button>
        )}
      </div>
    </div>
  );
};
const useStyles = makeStyles({
  proxy: {
    marginTop: "16px",
    webkitBoxAlign: "center",
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
  },
  pro: {
    verticalAlign: "top",
    width: "100%",
    boxSizing: "border-box",
    cursor: "inherit",
  },
  pointer: {
    cursor: "pointer",
  },
  border: {
    addingLeft: "12px",
    paddingRight: "12px",
    backgroundColor: " rgb(255, 255, 255)",
    maxWidth: "inherit",
    borderRadius: "6px",
    boxSizing: "border-box",
    webkitBoxAlign: "center",
    alignItems: "center",
    display: "flex",
    backgroundClip: "padding-box",
    border: "none",
    cursor: "inherit",
    overflow: "hidden",
    outline: "none 0px",
    position: "relative",
  },
  input: {
    marginTop: "8px",
    marginBottom: "8px",
    padding: "0px",
    marginRight: "8px",
    color: "rgba(0, 0, 0, 0.87)",
    backgroundColor: "transparent",
    fontSize: "16px",
    letterSpacing: "normal",
    lineHeight: "20px",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid gray",
    webkitBoxAlign: "center",
    alignItems: "center",
    outline: " none 0px",
    position: "relative",
    resize: "none",
    Zindex: "10",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  whitelist: {
    marginTop: "4px",
    alignItems: "flex-start",
    webkitBoxPack: "justify",
    justifyContent: "space-between",
    boxSizing: "border-box",
    display: "flex",
  },
  text: {
    minWidth: "auto",
    boxSizing: "border-box",
  },
  button: {
    margin: "4px 0px 0px 8px",
    padding: " 0px 12px",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
    fontSize: "14px",
    letterSpacing: "normal",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: "1px",
    boxSizing: "border-box",
    display: "inline-flex",
    fontWeight: "normal",
    height: "36px",
    position: "relative",
    verticalAlign: "middle",
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "rgb(214, 217, 219)",
    color: "rgba(0, 0, 0, 0.87)",
  },
  copy: {
    boxSizing: "border-box",
    webkitBoxAlign: "center",
    alignItems: "center",
    display: "flex",
    webkitBoxPack: "center",
    justifyContent: "center",
    position: "relative",
  },
});
export default ProxySecret;
