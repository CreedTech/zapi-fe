import React, { FormEvent, useEffect } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

import { useContextProvider } from "../contexts/ContextProvider";
import { useAppDispatch, useFormInputs, useHttpRequest } from "../hooks";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../utils";
import { login } from "../redux/slices/userSlice";
import { Fallback } from "../components";
import { GithubIcon, GoogleIcon } from "../assets";
import { showModal } from "../redux/slices/modalSlice";
import { useGoogleLogin } from "@react-oauth/google";
import ReactGA from "react-ga4";

ReactGA.send({ hitType: "pageview", page: "/login" });

const initialState = { email: "", password: "" };

const url = "VITE_IDENTITY_URL";
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const Login: React.FC = () => {
  const { deviceInfo, deviceLocation, deviceIP, handleUnclicked } =
    useContextProvider();
  const { error, loading, sendRequest } = useHttpRequest();
  const { inputs, bind } = useFormInputs(initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const cookies = new Cookies();

  const headers = { "Content-Type": "application/json" };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = inputs;
    if (!email || !EMAIL_REGEX.test(email))
      return toast.error("Invalid email address");
    if (!password || !PASSWORD_REGEX.test(password))
      return toast.error("Invalid password");
    const payload = {
      email,
      password,
      userInfo: {
        login_time: deviceLocation.time,
        country: { lat: deviceLocation.lat, lon: deviceLocation.lon },
        deviceIP,
        browser_name: deviceInfo.browserName,
        os_name: deviceInfo.osName,
      },
    };
    try {
      const data = await sendRequest(
        `/auth/signin`,
        "post",
        url,
        payload,
        headers
      );
      if (!data || data === undefined) return;
      const { access, email, fullName, profileId, refresh, userId, secretKey } =
        data.data;
      const user = { email, fullName, profileId, secretKey };
      dispatch(login(user));
      cookies.set("accessToken", access);
      cookies.set("refreshToken", refresh);
      cookies.set("profileId", profileId);
      cookies.set("userId", userId);
      cookies.set("secretKey", secretKey);
      handleUnclicked("login");
      dispatch(
        showModal({
          action: "hide",
          type: "loginModal",
        })
      );
      navigate("/developer/dashboard");
    } catch (error) {}
  };

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
        handleUnclicked("login");
        dispatch(
          showModal({
            action: "hide",
            type: "loginModal",
          })
        );
        navigate("/developer/dashboard");
      } catch (error) {}
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
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
          handleUnclicked("login");
          dispatch(
            showModal({
              action: "hide",
              type: "loginModal",
            })
          );
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
      <div
        className={classes.container}
        onClick={() => handleUnclicked("login")}>
        <div className={classes.main} onClick={(e) => e.stopPropagation()}>
          <Typography variant="body1" fontSize="40px" fontWeight={400}>
            Sign In
          </Typography>
          <p className={classes.subtitle}>
            Already have a ZAPI account? Sign in to begin exploring our API
            options.
          </p>
          <form onSubmit={handleLogin} className={classes.form}>
            <div className={classes.input}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                {...bind}
                placeholder="Enter your Email"
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                {...bind}
                placeholder="Enter a Password"
              />
            </div>
            <Typography variant="body1" fontSize="16px" alignSelf="flex-start">
              Forgot your password?
              <Link
                to="/forgot-password"
                className={classes.link}
                onClick={() => handleUnclicked("login")}>
                Reset it here.
              </Link>
            </Typography>
            <button
              type="submit"
              className={classes.button}
              style={{
                background: "#4B4B4B",
                color: "#FFF",
                marginBottom: "1rem",
              }}
              disabled={loading}>
              {loading ? "loading" : "Sign In"}
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

          <Typography variant="body1" fontSize="14px" alignSelf="center">
            Dont't have an account?
            <Link
              to="/signup"
              className={classes.link}
              onClick={() => handleUnclicked("login")}>
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeItems: "center",
    position: "fixed",
    overflow: "scroll",
    top: 0,
    left: 0,
    background: "rgba(225, 225, 225, 0.3)",
    backdropFilter: "blur(2px)",
    zIndex: 50,
  },
  main: {
    maxWidth: "500px",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFF",
    padding: "1rem 2rem",
    boxShadow: "2px 2px 7px 3px #CECECE",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
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
    },
    "@media screen and (max-width: 768px)": {
      width: "100%",
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
  },
});

export default Login;
