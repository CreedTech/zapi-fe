import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { showModal } from "../redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { Login } from "../components";

import { useHttpRequest } from "../hooks";
import { Fallback, Navbar } from "../components";
import ReactGA from "react-ga4";

// const url = import.meta.env.VITE_IDENTITY_URL
const url = "VITE_IDENTITY_URL";

const Otp: React.FC = () => {
  const { loading, error, sendRequest } = useHttpRequest();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const modalAction = useAppSelector((state) => state.modal.action);
  const modalType = useAppSelector((state) => state.modal.type);
  const modalDemo = useAppSelector((state) => state);
  const handleChange = (code: React.SetStateAction<string>) => setCode(code);

  ReactGA.send({ hitType: "pageview", page: "/otp" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!code) return toast.error("Please enter the OTP");
    const payload = { otp: code };
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        `/email-verification/confirm`,
        "post",
        url,
        payload,
        headers
      );
      const { success } = data;
      if (!success || success === false) {
        return;
      } else {
        toast.success(`${data?.message}`);
        const timeout = setTimeout(() => {
          // navigate('/login')
          dispatch(
            showModal({
              action: "show",
              type: "loginModal",
            })
          );
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {}
  };

  useEffect(() => {
    error && toast.error(`${error}`);
    error && console.log(error);
  }, [error]);

  return (
    <>
      {loading && <Fallback />}
      <div className={classes.container}>
        <img src="/images/zapi-logo.png" alt="zapi" className={classes.logo} />
        <section className={classes.sectionOne}>
          <Typography variant="h5" className={classes.title} gutterBottom>
            We have sent a One Time Password to your email
          </Typography>
          <Typography variant="body1" className={classes.sub} gutterBottom>
            Please Enter OTP
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={6}
              separator={<span style={{ width: "8px" }}></span>}
              isInputNum={true}
              shouldAutoFocus={true}
              inputStyle={{
                border: "1px solid #081F4A",
                width: "54px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
              focusStyle={{ border: "1px solid #CFD3DB", outline: "none" }}
            />
            <button type="submit">Submit</button>
          </form>
        </section>
        {modalAction === "show" && modalType === "loginModal" ? (
          <Login />
        ) : null}
      </div>
    </>
  );
};

export default Otp;

const useStyles = makeStyles({
  container: {
    background: "#fff",
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
    "@media screen and (max-width: 1100px)": {
      flexDirection: "column",
      alignItems: "center",
      // justifyContent: 'center',
      gap: "2rem",
      // height: '100%',
    },
  },
  logo: {
    width: "100px",
    height: "100px",
    "@media screen and (max-width: 1000px)": {
      width: "50px",
      height: "50px",
    },
  },
  sectionOne: {
    width: "100vw",
    margin: "0 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#081F4A",
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: ".5rem",
    "& input": {
      width: "30rem",
      height: "3.5rem",
      padding: "1rem",
      border: "1px solid #081F4A",
      borderRadius: "3px",
      "@media screen and (max-width: 450px)": {
        width: "20rem",
      },
    },
    "& button": {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      color: "#FFF",
      padding: "6px 16px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: "uppercase",
      fontFamily: "var(--body-font)",
      transition: "0.5s all ease-in-out cubic-bezier(0.075, 0.82, 0.165, 1)",
      cursor: "pointer",
      background: "#081F4A",
    },
  },
});
