import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Badge, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";

interface INotificationProps {
  socket: string | any;
}

const Notification: React.FC<INotificationProps> = ({ socket }) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRead = () => {
    setNotifications([]);
    setAnchorEl(null);
  };
  const ITEM_HEIGHT: number = 48;
  const profileId = cookies.get("profileId");
  // notifications.push("apiHosted")

  socket = io(import.meta.env.VITE_SOCKET_URL);
  useEffect(() => {
    const item = localStorage.getItem("notifications");
    if (notifications) {
      setNotifications(notifications);
    }
  }, []);
  useEffect(() => {
    try {
      socket.on(`newSubscription_${profileId}`, (data: any) => {
        setNotifications([...notifications, data]);
        notifications.unshift(data);
      });
      socket.on(`unSubscription_${profileId}`, (data: any) => {
        setNotifications([...notifications, data]);
        notifications.unshift(data);
      });
      socket.on(`apiHosted_${profileId}`, (data: any) => {
        setNotifications([...notifications, data]);
        notifications.unshift(data);
      });
      socket.on(`apiDown_${profileId}`, (data: any) => {
        setNotifications([...notifications, data]);
        notifications.unshift(data);
      });
      localStorage.setItem("notifications", JSON.stringify([...notifications]));
    } catch (error) {}
  }, [socket, notifications]);

  // console.log(notifications);

  const displayNotification = (type: string) => {
    let action;

    if (type === "newSubscription") {
      action = "newSubscription";
      return (
        <MenuItem>
          <img src="/images/zapi-logo.png" alt="zapi-logo" width="30ch" />
          <span className={classes.notification}>
            Someone Subscribed To your api
          </span>
        </MenuItem>
      );
    } else if (type === "unSubscription") {
      action = "unSubscription";
      return (
        <MenuItem>
          <img src="/images/zapi-logo.png" alt="zapi-logo" width="30ch" />
          <span className={classes.notification}>
            Someone UnSubscribed from your api
          </span>
        </MenuItem>
      );
    } else if (type === "apiHosted") {
      action = "apiHosted";
      return (
        <MenuItem>
          <img src="/images/zapi-logo.png" alt="zapi-logo" width="30ch" />
          <span className={classes.notification}>Your Api has been Hosted</span>
        </MenuItem>
      );
    } else if (type === "apiDown") {
      action = "apiDown";
      return (
        <MenuItem>
          <img src="/images/zapi-logo.png" alt="zapi-logo" width="30ch" />
          <span className={classes.notification}>Your Api is down</span>
        </MenuItem>
      );
    }
  };

  return (
    <>
      <div>
        {notifications.length > 0 ? (
          <Badge badgeContent={notifications.length} color="error">
            <span
              onClick={handleClick}
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true">
              <NotificationsNoneIcon
                style={{
                  cursor: "pointer",
                  color: "black",
                  marginTop: ".25rem",
                }}
              />
            </span>
          </Badge>
        ) : (
          <span
            onClick={handleClick}
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true">
            <NotificationsNoneIcon
              style={{ cursor: "pointer", color: "black", marginTop: ".25rem" }}
            />
          </span>
        )}
        {open && (
          <div>
            {notifications.length > 0 ? (
              <>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 5,
                      width: "35ch",
                    },
                    sx: {
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                  {notifications.map((n: any) => displayNotification(n))}

                  <MenuItem>
                    <span
                      className={classes.nButton}
                      style={{ background: "#081F4A", color: "#FF5C00" }}
                      onClick={handleRead}>
                      Mark as read
                    </span>
                  </MenuItem>
                  <MenuItem style={{ height: "30px" }}>
                    <span className={classes.notification}>
                      <Link to="/notifications">View all notifications</Link>
                    </span>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 5,
                      width: "30ch",
                    },
                    sx: {
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 40,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                  <MenuItem>
                    <span className={classes.notification}>
                      No new notification
                    </span>
                  </MenuItem>
                  <MenuItem style={{ height: "30px" }}>
                    <span className={classes.notification}>
                      <Link to="/notifications">View all notifications</Link>
                    </span>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles({
  notification: {
    padding: "5px",
    width: "25rem",
    height: "3rem",
    bordeBottom: "5px solid black",
    borderRadius: "15px",
    textAlign: "center",
    paddingTop: "15px",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "default",
    "@media screen and (max-width: 450px)": {
      width: "10rem",
    },
  },
  notifications: {
    position: "absolute",
    top: "50px",
    right: "-2.5rem",
    backgroundColor: "#F3F4F6",
    color: "black",
    fontWeight: "300",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    zIndex: "9999",
  },
  nButton: {
    width: "100%",
    height: "3rem",
    background: "#081F4A",
    borderRadius: "15px",
    textAlign: "center",
    paddingTop: "15px",
    color: "#FF5C00",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
    "@media screen and (max-width: 750px)": {
      width: "100%",
    },
  },
});

export default Notification;
