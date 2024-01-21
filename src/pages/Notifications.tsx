import React, { useEffect } from "react";
import { useContextProvider } from "../contexts/ContextProvider";
import { Typography, Stack } from "@mui/material";
import { useAppSelector } from "../hooks";
import { DevNavbar } from "../components";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const Notifications: React.FC = () => {
  const { notifications } = useAppSelector((store) => store.notifications);
  const classes = useStyles();
  const { setActiveMenu, screenSize, setScreenSize } = useContextProvider();
  const [data] = notifications;

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(innerWidth);
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    screenSize <= 900 ? setActiveMenu(false) : null;
  }, [screenSize]);

  const displayNotification = (content: string | null) => {
    let message;
    switch (content) {
      case "newSubscription":
        message = "Someone Subscribed To your api";
        break;
      case "unSubscription":
        message = "Someone UnSubscribed from your api";
        break;
      case "apiHosted":
        message = "Your Api has been Hosted";
        break;
      case "apiDown":
        message = "Your Api is down";
        break;
      default:
        break;
    }
    return (
      <>
        <span
          className={
            classes.notification
          }>{`${message} - ${data.createdOn?.toLocaleString()} `}</span>
      </>
    );
  };

  return (
    <>
      <DevNavbar />
      <div>
        {notifications.length !== 0 ? (
          <div className={classes.notificationCard}>
            <Typography gutterBottom variant="h4">
              View All Notifications
            </Typography>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100vw" }}>
              {notifications.map(() => displayNotification(data.content))}
            </Stack>
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.noNotification}>
              <Typography
                gutterBottom
                variant="subtitle1"
                sx={{
                  color: "#000000",
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "30px",
                  textAlign: "center",
                  marginTop: "116px",
                }}>
                You do no have any old notifications
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                sx={{
                  color: "#000000",
                  fontFamily: "Space Grotesk",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "30px",
                  textAlign: "center",
                  marginTop: "16px",
                }}>
                <Link to="/">Go Back</Link>
              </Typography>
            </div>
          </div>
        )}
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
  },
  noNotification: {
    marginTop: "200px",
    alignItems: "center",
    paddingBottom: "80px",
    height: "calc(100vh - 315px)",
  },
  notification: {
    // width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  notificationCard: {
    height: "calc(100vh - 715px)",
    marginTop: "100px",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
});

export default Notifications;
