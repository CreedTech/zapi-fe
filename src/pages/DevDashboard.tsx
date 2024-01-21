import React, { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

import { useContextProvider } from "../contexts/ContextProvider";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserApis, getSubscribedApis } from "../redux/slices/userSlice";
import { DevNavbar, DevAddApi } from "../components";
import { getValidCategories } from "../redux/slices/apiSlice";
import ReactGA from "react-ga4";

ReactGA.send({ hitType: "pageview", page: "/developer/dashboard" });

const DevDashboard: React.FC = () => {
  const { isLoggedIn } = useAppSelector((store) => store.user);
  const { trigger } = useContextProvider();
  const dispatch = useAppDispatch();

  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  const fetchValidCategories = useMemo(
    () => dispatch(getValidCategories()),
    []
  );

  useEffect(() => {
    fetchValidCategories;
  }, []);

  useEffect(() => {
    dispatch(getUserApis(`${profileId}`));
  }, [isLoggedIn === true, trigger]);

  useEffect(() => {
    dispatch(getSubscribedApis(`${profileId}`));
  }, [isLoggedIn === true, trigger]);

  return (
    <>
      <DevNavbar />
      <DevAddApi />
    </>
  );
};

export default DevDashboard;
