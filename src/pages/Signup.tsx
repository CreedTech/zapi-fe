import React, { FormEvent, useState, useEffect, SyntheticEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Divider, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { Cancel } from "@mui/icons-material";
import Cookies from "universal-cookie";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  MATCH_CHECKER,
  PASSWORD_LENGTH,
} from "../utils";
import { useContextProvider } from "../contexts/ContextProvider";
import { useAppDispatch, useFormInputs, useHttpRequest } from "../hooks";
import { Fallback, PasswordStrengthMeter } from "../components";
import { HomeNavbar } from "../sections";
import { GithubIcon, GoogleIcon } from "../assets";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "../redux/slices/userSlice";
import ReactGA from "react-ga4";
import axios from "axios";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirm_password: "",
  terms: false,
};
// const url = import.meta.env.VITE_IDENTITY_URL;
const url = "VITE_IDENTITY_URL";
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const Signup: React.FC = () => {
  const classes = useStyles();
  const { inputs, bind, toggle } = useFormInputs(initialState);
  const { deviceInfo, deviceLocation, deviceIP, handleClicked } =
    useContextProvider();
  const { fullName, email, password, confirm_password, terms } = inputs;
  const { error, loading, sendRequest } = useHttpRequest();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const cookies = new Cookies();
  const disabled =
    !terms ||
    !PASSWORD_REGEX.test(password) ||
    !MATCH_CHECKER(password, confirm_password);

  ReactGA.send({ hitType: "pageview", page: "/signup" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirm_password)
      return toast.error("Please fill all fields");
    if (!EMAIL_REGEX.test(email)) return toast.error("Email is invalid");
    if (!PASSWORD_REGEX.test(password))
      return toast.error("Password is not strong enough");
    if (!MATCH_CHECKER(password, confirm_password))
      return toast.error("Passwords do not match");
    if (!terms)
      return toast.error(
        "Please read and accept the T&Cs before you can proceed"
      );
    const headers = { "Content-Type": "application/json" };
    const payload = { fullName, email, password };
    try {
      const data = await sendRequest(
        `/auth/signup`,
        "post",
        url,
        payload,
        headers
      );
      const { success } = data;
      if (!success || success === false) {
        return;
      } else {
        toast.success(`${data?.data}`);
        const timeout = setTimeout(() => navigate("/otp"), 3000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {}
  };
  const [values, setValues] = useState(initialState);

  const googleAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      const payload = {
        token: response.code,
        userInfo: {
          login_time: deviceLocation.time,
          country: { lat: deviceLocation.lat, lon: deviceLocation.lon },
          deviceIP,
          browser_name: deviceInfo.browserName,
          os_name: deviceInfo.osName,
        },
      };
      const headers = { "Content-Type": "application/json" };
      try {
        const token = await sendRequest(
          "/auth/google",
          "post",
          url,
          payload,
          headers
        );
        if (!token) return;
        toast.success("Login Successful!");
        const {
          access,
          email,
          fullName,
          profileId,
          refresh,
          userId,
          secretKey,
        } = token.data;
        const user = { email, fullName, profileId, secretKey };
        dispatch(login(user));
        cookies.set("accessToken", access);
        cookies.set("refreshToken", refresh);
        cookies.set("profileId", profileId);
        cookies.set("userId", userId);
        cookies.set("secretKey", secretKey);
        navigate("/developer/dashboard");
      } catch (error) {}
    },
    onError: (errorResponse) => {
      console.log("error", errorResponse);
      toast.error("Login Failed, try to login with your email.");
    },
  });

  const githubAuth = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + GITHUB_CLIENT_ID
    );
  };

  if (searchParams.get("code")) {
    useEffect(() => {
      const githubLogin = async () => {
        const payload = {
          token: searchParams.get("code"),
          userInfo: {
            login_time: deviceLocation.time,
            country: { lat: deviceLocation.lat, lon: deviceLocation.lon },
            deviceIP,
            browser_name: deviceInfo.browserName,
            os_name: deviceInfo.osName,
          },
        };
        const headers = { "Content-Type": "application/json" };
        try {
          const data = await sendRequest(
            "/auth/github",
            "post",
            url,
            payload,
            headers
          );
          if (!data) return;
          toast.success("Login Successful!");
          const {
            access,
            email,
            fullName,
            profileId,
            refresh,
            userId,
            secretKey,
          } = data.data;
          const user = { email, fullName, profileId, secretKey };
          dispatch(login(user));
          cookies.set("accessToken", access);
          cookies.set("refreshToken", refresh);
          cookies.set("profileId", profileId);
          cookies.set("userId", userId);
          cookies.set("secretKey", secretKey);
          navigate("/developer/dashboard");
        } catch (error) {}
      };
      githubLogin();
    }, []);
  }

  useEffect(() => {
    {
      error && toast.error(`${error}`);
    }
  }, [error]);

  return (
    <>
      {loading && <Fallback />}
      <HomeNavbar />
      <div className={classes.container}>
        <div className={classes.main} onClick={(e) => e.stopPropagation()}>
          <Typography
            variant="body1"
            fontSize="40px"
            fontWeight={400}
            textAlign="center">
            Create a Free Account
          </Typography>

          <p className={classes.subtitle}>
            Complete this form to register on ZAPI and start exploring our API
            options
          </p>

          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.input}>
              <label htmlFor="fullName">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                {...bind}
                placeholder="Enter your full name"
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                {...bind}
                placeholder="Enter your email"
              />
            </div>
            <div className={classes.input} style={{ marginBottom: "1rem" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                {...bind}
                placeholder="Enter a Password"
              />
              {password.length > 20 ? (
                <Typography variant="caption" color="error">
                  {/* <Cancel sx={{ fontSize: 15, marginRight: 0.5 }} color="error" /> */}
                  Password is too long (Enter between 8 - 20 characters long)
                </Typography>
              ) : (
                <PasswordStrengthMeter password={password} />
              )}
            </div>
            <div className={classes.input}>
              <label htmlFor="confirm_password">
                Confirm Password <span>*</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                {...bind}
                placeholder="Re-enter the Password"
                style={
                  !MATCH_CHECKER(password, confirm_password)
                    ? { border: "2px solid red" }
                    : { border: "2.5px solid green" }
                }
              />
              {MATCH_CHECKER(password, confirm_password) ? (
                <></>
              ) : (
                <Typography variant="caption" color="error">
                  <Cancel
                    sx={{ fontSize: 15, marginRight: 0.5 }}
                    color="error"
                  />
                  Password does not match
                </Typography>
              )}
            </div>
            <div className={classes.check_input}>
              <input type="checkbox" name="terms" {...toggle} />
              <label htmlFor="terms">
                I agree to ZAPI’s
                <Link to="/terms" className={classes.link}>
                  terms and conditions and privacy policy.
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className={classes.button}
              style={{
                background: "#4B4B4B",
                color: "#FFF",
                marginBottom: "1rem",
              }}
              disabled={disabled}>
              {loading ? "loading" : "Signup"}
            </button>
          </form>

          <Divider>OR</Divider>
          <Stack direction="column" alignItems="center" mt={1} spacing={2}>
            <button
              type="button"
              className={classes.button}
              onClick={() => googleAuth()}>
              <span style={{ marginRight: "1rem" }}>
                <GoogleIcon />
              </span>
              Sign in with Google
            </button>
            <button
              className={classes.button}
              style={{ border: "1px solid #ccc" }}
              onClick={githubAuth}>
              <span style={{ marginRight: "1rem" }}>
                <GithubIcon />
              </span>
              Sign in With Github
            </button>
          </Stack>
          <Typography
            variant="body1"
            fontSize="16px"
            alignSelf="center"
            textAlign="center">
            Already have an account?
            <span
              className={classes.link}
              onClick={() => handleClicked("login")}>
              Sign in
            </span>
          </Typography>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    background: "#FFF",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "8rem",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    "@media screen and (max-width: 768px)": {
      width: "80%",
    },
  },
  input: {
    width: "440px",
    height: "72px",
    background: "",
    display: "flex",
    flexDirection: "column",
    padding: "",
    "& input": {
      width: "100%",
      height: "52px",
      borderRadius: "4px",
      border: "1px solid #999",
      outline: "none",
      padding: "12px 16px 8px 12px",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px",
    },
    "& label": {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "16px",
      marginBottom: "0.5rem",
      "& span": {
        color: "#C00",
      },
    },
    "@media screen and (max-width: 768px)": {
      width: "100%",
    },
  },
  check_input: {
    width: "90%",
    display: "flex",
    alignItems: "flex-start",
    "& input": {
      width: "16px",
      height: "16px",
      flex: "none",
      order: 0,
      flexGrow: 0,
      margin: "0.25rem 1rem 0 0",
      cursor: "pointer",
    },
    "& label": {
      fontWeight: 400,
      fontSize: "16px",
      color: "#000",
    },
  },
  button: {
    width: "440px",
    height: "52px",
    display: "flex",
    flexDirection: "row",
    background: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    color: "#000",
    outline: "none",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "16px",
    cursor: "pointer",
    padding: "0 1rem",
    "@media screen and (max-width: 768px)": {
      width: "100%",
    },
  },
  subtitle: {
    maxWidth: "468px",
    fontSize: "20px",
    fontWeight: 400,
    margin: "12px 0 24px",
    textAlign: "center",
    "@media screen and (max-width: 500px)": {
      width: "90%",
    },
  },
  link: {
    textDecoration: "underline",
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
});

export default Signup;
