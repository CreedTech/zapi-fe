import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ZapiHomeLogo from "../assets/images/ZapiHomeLogo.png";
import ReactGA from "react-ga4";

const identity_url = import.meta.env.VITE_IDENTITY_URL;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const classes = useStyles();

  ReactGA.send({ hitType: "pageview", page: "/login" });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { email: email };
    try {
      const url = `${identity_url}/auth/forgot`;
      const res = await axios.post(url, userData);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/reset-password");
      }, 5000);
    } catch (error: any) {
      if (error.request.status === 400) {
        return toast.error(error.response.data.message);
      } else {
        return toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        <img src={ZapiHomeLogo} alt="zapi" className={classes.logo} />
        <section className={classes.sectionOne}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Forgot Password?
          </Typography>
          <Typography variant="body1" className={classes.sub} gutterBottom>
            No need to worry, we'll send you an email with instructions to
            reset.
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;

const useStyles = makeStyles({
  container: {
    background: "#f5f5f5",
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
    "@media screen and (max-width: 1100px)": {
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
    },
  },
  logo: {
    width: "70px",
    height: "70px",
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
      padding: "1rem 1rem",
      outline: "none",
      border: "1px solid #999",
      borderRadius: "5px",
      "@media screen and (max-width: 450px)": {
        width: "20rem",
      },
    },
    "& button": {
      width: "30rem",
      height: "3rem",
      background: "#4B4B4B",
      borderRadius: "5px",
      color: "#FDFDFD",
      fontWeight: 600,
      fontSize: "1rem",
      cursor: "pointer",
      marginBottom: "2rem",
      "@media screen and (max-width: 450px)": {
        width: "100%",
      },
    },
  },
});
