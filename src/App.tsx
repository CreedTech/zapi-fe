import "./App.css";
import React, { Suspense, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { deviceDetect } from "react-device-detect";
import ReactGA from "react-ga4";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  DevDashboard,
  DeveloperApiPage,
  Home,
  HomePage,
  Signup,
  UserProfile,
  ForgotPassword,
  LoginHistory,
  Otp,
  SuccessPage,
  Configuration,
  TermsConditions,
  ResetPassword,
  Pricing,
  Documentation,
  APIHub,
  Notifications,
  ComingSoonPage,
  ApiHubTry,
  APIMoreInfo,
  SingleDiscussionPage,
} from "./pages";
import {
  Fallback,
  Login,
  AddApiPopup,
  AddDiscussion,
  AddChildrenDiscussion,
} from "./components";
import { useContextProvider } from "./contexts/ContextProvider";
import { login } from "./redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { PrivateRoutes } from "./components/routes";
import { getUserApis, getSubscribedApis } from "./redux/slices/userSlice";
import {
  getApiCategories,
  getApis,
  getPopularApis,
  getValidCategories,
} from "./redux/slices/apiSlice";
import { getDeviceIP } from "./utils";
import { theme } from "./theme";
import Cookies from "universal-cookie";

ReactGA.initialize("G-EML55TX3Y7");

const App: React.FC = () => {
  const { isClicked, setDeviceLocation, setDeviceInfo, setDeviceIP } =
    useContextProvider();
  const { isLoggedIn } = useAppSelector((store) => store.user);
  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const device = deviceDetect(navigator.userAgent);
    setDeviceInfo(device);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setDeviceLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        time: position.timestamp,
      });
    });
  }, []);

  useEffect(() => {
    const getIPAddress = async () => {
      const data = await getDeviceIP();
      setDeviceIP(data);
    };
    getIPAddress();
  }, []);

  useEffect(() => {
    const loginUser = () => {
      const item = localStorage.getItem("zapi_user");
      if (!item) return;
      const user = JSON.parse(item);
      dispatch(login(user));
    };
    loginUser();
  }, []);

  const fetchApis = useMemo(() => dispatch(getApis()), []);
  // const fetchPopularApis = useMemo(() => dispatch(getPopularApis()), []);
  const fetchCategories = useMemo(() => dispatch(getApiCategories()), []);

  useEffect(() => {
    fetchApis;
  }, []);
  // useEffect(() => {
  //   fetchPopularApis;
  // }, []);
  useEffect(() => {
    fetchCategories;
  }, []);

  useEffect(() => {
    if (profileId === undefined) return;
    dispatch(getUserApis(profileId));
    dispatch(getSubscribedApis(profileId));
  }, [isLoggedIn === true, profileId]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <div>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/api-hub" element={<APIHub />} />
            <Route path="/api/:id" element={<APIMoreInfo />} />
            <Route path="/api-hubtry" element={<ApiHubTry />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="/api-hub/:id" element={<APIMoreInfo />} />
            <Route path="/discussion/:id" element={<SingleDiscussionPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/developer/dashboard" element={<DevDashboard />} />
              <Route path="/developer/api/:id" element={<DeveloperApiPage />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/login-history" element={<LoginHistory />} />
              <Route path="/success-page" element={<SuccessPage />} />
            </Route>
          </Routes>
        </Suspense>

        {isClicked.login && <Login />}
        {isClicked.addapi && <AddApiPopup />}
        {isClicked.addDiscussion && <AddDiscussion />}
        {isClicked.addChildrenDiscussion && <AddChildrenDiscussion />}
      </div>
    </ThemeProvider>
  );
};

export default App;
