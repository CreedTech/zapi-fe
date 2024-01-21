import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Link, NavLink } from "react-router-dom";

import Menus from "../components/Menus";
import { ZapiDevLogo, ZapiWidget } from "../assets";

import { Menu } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { logout } from "../redux/slices/userSlice";
import Cookies from "universal-cookie";

import { ZapiArrow } from "../assets";
import { Button, List, ListItem, Typography } from "@mui/material";

import { io } from "socket.io-client";
import Notification from "./Notification";
interface NavbarProps {
  id?: string;
}

const DevNavbar: React.FC<NavbarProps> = ({ id }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { userApis } = useAppSelector((store) => store.user);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = async () => {
    await setIsOpen(true);
    dispatch(logout());
    cookies.remove("accessToken");
    navigate("/");
  };

  const handleProjectList = () => {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  const [socket, setSocket] = useState<any>("");

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SOCKET_URL));
  }, []);

  return (
    <>
      <div className={classes.NavBar}>
        <Link to="/">
          <div className={classes.logo}>
            <img src={ZapiDevLogo} alt="Zapi-dev" />
            <span className={classes.zapi}>Z-API</span>
          </div>
        </Link>

        <div className={classes.widget}>
          <Link to="/developer/dashboard" className={classes.api}>
            <img src={ZapiWidget} alt="Zapi-widget" />
            <Typography className={classes.typography}>API Projects</Typography>
          </Link>
        </div>

        <div className={classes.menus}>
          <Menus />
        </div>

        <div className={classes.right_container}>
          <Notification socket={socket} />
          <div className={classes.hamburger} onClick={handleClick}>
            <Menu />
          </div>
        </div>
      </div>
      <div>
        {isOpen ? (
          <>
            <div className={classes.responsiveMenu}>
              <Button
                className={classes.allProjects}
                onClick={handleProjectList}>
                All Projects
                <img
                  src={ZapiArrow}
                  alt="zapi-arrow"
                  style={{ color: "#00000", marginLeft: "0.4rem" }}
                />
              </Button>

              {isShow ? (
                <List className={classes.projectListContainer}>
                  {userApis.map((api, index) => (
                    <Link to={`/developer/api/${api.id}`} key={index}>
                      <ListItem className={classes.projectListItems}>
                        {api.name}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              ) : (
                <></>
              )}
              <div>Developer Board</div>
              <div>Apps</div>
              <div>Help</div>
              <button className={classes.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div></div>
    </>
  );
};

const useStyles = makeStyles({
  NavBar: {
    position: "fixed",
    top: "0",
    left: "0rem",
    right: "0rem",
    zIndex: 30,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "24px 112px",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "#C4C4C4",
    height: "70px",
    fontFamily: "Space Grotesk",
    "@media screen and (max-width: 1024px)": {
      padding: "1rem 2rem",
    },
    "@media screen and (max-width: 500px)": {
      padding: "1rem",
    },
    "@media screen and (max-width: 375px)": {
      padding: "0",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    "@media screen and (max-width: 900px)": {
      scale: 0.9,
    },
    "@media screen and (max-width: 420px)": {
      scale: 0.8,
    },
  },
  zapi: {
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "30px",
    color: "#000000",
    alignItems: "center",
    display: "flex",
    "@media screen and (max-width: 900px)": {
      scale: 0.9,
    },
    "@media screen and (max-width: 420px)": {
      scale: 0.8,
    },
  },
  widget: {
    color: "#1C1B1F",
    gap: "1rem",
    display: "flex",
    alignItems: "center",
    marginLeft: "200px",
    "@media screen and (max-width: 900px)": {
      marginLeft: "-8%",
      scale: 0.9,
    },
    "@media screen and (max-width: 420px)": {
      scale: 0.8,
    },
  },
  api: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontWeight: "400",
    fontSize: "16px",
    textDecoration: "none",
    color: "#000000",
  },
  typography: {
    "@media screen and (max-width: 380px)": {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    width: "inherit",
  },
  right_container: {
    display: "none",
    "@media screen and (max-width: 900px)": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "1rem",
    },
    "@media screen and (max-width: 420px)": {
      scale: 0.9,
    },
  },
  menus: {
    "@media screen and (max-width: 900px)": {
      display: "none",
    },
  },
  hamburger: {
    cursor: "pointer",
    fontSize: "2rem",
    color: "#000",
    zIndex: "1000",
  },
  responsiveMenu: {
    position: "fixed",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "70px",
    backgroundColor: "#fff",
    padding: "6rem",
    fontSize: "17px",
    lineHeight: "2.5rem",
    width: "100%",
    height: "100%",
    zIndex: "10",
    "@media screen and (max-width: 900px)": {
      display: "flex",
    },
    "@media screen and (min-width: 900px)": {
      display: "none",
    },
    "@media screen and (max-width: 500px)": {
      padding: "4rem",
    },
    "@media screen and (max-width: 420px)": {
      marginTop: "50px",
      fontSize: "15px",
    },
  },
  allProjects: {
    "&.MuiButton-text": {
      fontWeight: "normal",
      color: "#000",
    },
    "&.MuiButton-root": {
      textTransform: "none",
      fontSize: "17px",
      width: "150px",
      "@media screen and (max-width: 420px)": {
        fontSize: "15px",
      },
    },
  },
  projectListContainer: {
    // "&.MuiList-root": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    textAlign: "center",
    lineHeight: "2rem",
    width: "100%",
    // },
  },
  projectListItems: {
    // "&.MuiListItem-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: "25px",
    color: "#909090",
    width: "150px",
    "@media screen and (max-width: 420px)": {
      fontSize: "13px",
    },
    // },
  },
  logout: {
    border: "unset",
    marginTop: "10px",
    backgroundColor: "#000",
    padding: "8px",
    fontSize: "15px",
    width: "150px",
    "@media screen and (max-width: 420px)": {
      padding: "6px",
      fontSize: "13px",
      width: "140px",
    },
  },
});
export default DevNavbar;
