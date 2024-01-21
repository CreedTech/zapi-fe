import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  BookmarkAddOutlined,
  BookmarkRemove,
  StackedLineChart,
  TimerOutlined,
  Check,
} from "@mui/icons-material";

import { useAppDispatch, useAppSelector, useHttpRequest } from "../hooks";
import { useContextProvider } from "../contexts/ContextProvider";
import { getSubscribedApis } from "../redux/slices/userSlice";
import { getApis } from "../redux/slices/apiSlice";
import { CardProps } from "../interfaces";
import { Spinner } from "../assets";

const core_url = "VITE_CORE_URL";

const APICard: React.FC<CardProps> = ({
  id,
  name,
  description,
  rating,
  latency,
  popularity,
}) => {
  const { error, loading, sendRequest } = useHttpRequest();
  const { subscribedApis } = useAppSelector((store) => store.user);
  const { handleClicked } = useContextProvider();
  const classes = useStyles();
  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  const accessToken = cookies.get("accessToken");
  const dispatch = useAppDispatch();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    subscribedApis.forEach((api) => {
      if (api.apiId === id) return setIsSubscribed(true);
    });
  }, []);

  const handleSubscription = async () => {
    const headers = {
      "Content-Type": "application/json",
      "X-Zapi-Auth-Token": `Bearer ${accessToken}`,
    };
    const queryStringParameters = { profileId };
    if (!isSubscribed) {
      try {
        const data = await sendRequest(
          `/subscription/subscribe/${id}`,
          "post",
          core_url,
          undefined,
          headers,
          queryStringParameters
        );
        if (!data || data === undefined) return;
        const { message } = data;
        toast.success(`${message}`);
        setIsSubscribed(true);
      } catch (error) {}
    } else {
      try {
        const data = await sendRequest(
          `/subscription/unsubscribe/${id}`,
          "post",
          core_url,
          undefined,
          headers,
          queryStringParameters
        );
        if (!data || data == undefined) return;
        const { message } = data;
        toast.success(`${message}`);
        setIsSubscribed(false);
      } catch (error) {}
    }
    dispatch(getApis());
    dispatch(getSubscribedApis(profileId));
  };

  useEffect(() => {
    error && toast.error(`${error}`);
  }, [error]);

  return (
    <div className={classes.card}>
      {loading && (
        <div className={classes.spinner}>
          <Spinner width="50px" height="50px" />
        </div>
      )}
      <div>
        <div className={classes.topBar}>
          <div className={classes.icon}></div>
          <Tooltip
            onClick={accessToken ? handleSubscription : () => handleClicked("login")}
            title={isSubscribed ? "Unsubscribe" : "Subscribe"}
            placement="right"
            arrow>
            {isSubscribed ? (
              <BookmarkRemove className={classes.subscribe} />
            ) : (
              <BookmarkAddOutlined className={classes.subscribe} />
            )}
          </Tooltip>
        </div>
        <Link to={`/api/${id}`} className={classes.body}>
          <h4>{name || "API Name"}</h4>
          <p>
            {description && description?.length > 60
              ? `${String(description).substring(0, 70)}...`
              : description || "API Description."}
          </p>
        </Link>
      </div>

      <div className={classes.bottomBar}>
        <div className={classes.item} title="no. of subscribers">
          <StackedLineChart
            sx={{ width: "18px" }}
            className={classes.itemIcon}
          />
          <p className={classes.itemTitle}>{popularity}</p>
        </div>
        <div className={classes.item} title="latency">
          <TimerOutlined sx={{ width: "18px" }} className={classes.itemIcon} />
          <p className={classes.itemTitle}>{latency || 0}ms</p>
        </div>
        <div className={classes.item} title="rating">
          <Check sx={{ width: "18px" }} className={classes.itemIcon} />
          <p className={classes.itemTitle}>{rating}/10</p>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  card: {
    position: "relative",
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "31px 28px 33px 29px",
    minWidth: "300px",
    height: "250px",
    background: "#fff",
    border: "1px solid #c5c5c5",
    borderRadius: "0.5rem",
    margin: "10px",
    transition: "ease-in-out all 0.3s",
    "&:hover": {
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    },
    "@media screen and (max-width: 820px)": {
      marginLeft: "-20px",
      scale: 0.9,
    },
    "@media screen and (max-width: 430px)": {
      scale: 0.85,
    },
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  icon: {
    marginBottom: "13px",
    backgroundColor: "#253480",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
  },
  subscribe: {
    cursor: "pointer",
    color: "#515D99",
    width: "17px",
    height: "auto",
  },
  body: {
    "& h4": {
      marginBottom: "10px",
      fontWeight: "bold",
      fontSize: "17px",
      color: "#071B85",
      width: "186px",
    },
    "& p": {
      fontSize: "12px",
      lineHeight: "22px",
      color: "#4554A3",
      maxWidth: "300px",
    },
  },
  bottomBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  itemIcon: {
    color: "#515D99",
  },
  itemTitle: {
    fontSize: "10px",
    color: "#515D99",
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    background: "rgba(14, 36, 78, 0.5)",
    zIndex: 2,
    borderRadius: "0.5rem",
  },
});

export default APICard;
