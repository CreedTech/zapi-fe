import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux-hook";
import { Close, Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useContextProvider } from "../contexts/ContextProvider";
import Vector from "../assets/images/Vector.png";
import ZapiHomeLogo from "../assets/images/ZapiHomeLogo.png";
import {Box, Button, Modal, TextareaAutosize, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { logout } from "../redux/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hook";
import Cookies from "universal-cookie";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";


const HomeNavbar: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(classes.mobile);
  const theme = useTheme();
  const isMatch = useMediaQuery("(max-width: 870px)");
  const { handleClicked } = useContextProvider();
  const { isLoggedIn } = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleClick = () => {
    setMenuOpen((p) => !p);
    if (open === classes.mobile) {
      setOpen(classes.mobileLinks);
    } else {
      setOpen(classes.mobile);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("profileId");
    cookies.remove("userId");
    cookies.remove("secretKey");
    navigate("/");
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function bg() {
    if (location.pathname === "/api-hub") {
      return scrollPosition > 250 ? "#081F4A" : "transparent";
    } else {
      return "#081F4A";
    }
  }

  return (
    <>
      <div className={classes.NavBar} style={{ background: bg() }}>
        <div className={classes.logo}>
          <a href="/">
            <img src={ZapiHomeLogo} alt="zapi-Home" />
          </a>
          <span className={classes.zapi}>Z-API</span>
        </div>
        {isMatch ? (
          <>
            <div className={open}>
              <ul>
                <li>
                  <NavLink
                    end
                    to="/"
                    style={({ isActive }) =>
                      isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                    }>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/api-hub"
                    style={({ isActive }) =>
                      isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                    }>
                    API hub
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pricing"
                    style={({ isActive }) =>
                      isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                    }>
                    Pricing
                  </NavLink>
                </li>
              </ul>
              <li>
                <NavLink
                  to="/documentation"
                  style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                  }>
                  Documentation
                </NavLink>
              </li>
              {!isLoggedIn ? (
                  <li>
                    <button onClick={() => handleClicked("login")}>
                      Login
                    </button>
                  </li>
                ) : null}
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/developer/dashboard"
                    className={classes.dashboard}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              <div className={classes.signup}>
                {!isLoggedIn ? (
                  <NavLink to="/signup">Sign up</NavLink>
                ) : (
                  <button className={classes.logout} onClick={() => handleLogOut()}>Logout</button>
                )}
              </div>
            </div>
            <div className={classes.hamburger} onClick={handleClick}>
              {" "}
              {menuOpen === false ? <Menu /> : <CloseIcon />}
            </div>
          </>
        ) : (
          <div className={classes.links}>
            <ul>
              <li>
                <NavLink
                  end
                  to="/"
                  style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/api-hub"
                  style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                  }>
                  API hub
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pricing"
                  style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                  }>
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/documentation"
                  style={({ isActive }) =>
                    isActive ? { borderBottom: "2px solid #FFEA00" } : {}
                  }>
                  Documentation
                </NavLink>
              </li>
              {isLoggedIn && (
                <div>
                  <NavLink
                    to="/developer/dashboard"
                    className={classes.dashboard}>
                    Dashboard
                  </NavLink>
                </div>
              )}
              {!isLoggedIn && (
                <li>
                  <button onClick={() => handleClicked("login")}>Login</button>
                </li>
              )}
            </ul>
            {!isLoggedIn ? (
              <div className={classes.signup}>
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            ) : (
              <button className={classes.signup} onClick={() => handleLogOut()}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeNavbar;

const useStyles = makeStyles({
  NavBar: {
    position: "fixed",
    left: "0rem",
    right: "0rem",
    zIndex: 30,
    height: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 1px 15px rgba(7, 27, 133, 0.15)",
    padding: "0 5rem",
    "@media screen and (max-width: 1024px)": {
      padding: "1rem 2rem",
    },
    "@media screen and (max-width: 375px)": {
      padding: "1rem 1rem",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    width: "30%",
    height: "100%",
    backgroundImage: `url(${Vector})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "40% 100%",
    "@media screen and (max-width: 495px)": {
      width: "auto",
    },
  },
  vector: {
    width: "200px",
    height: "100%",
    backgroundImage: `url(${Vector})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0px 100%",
  },
  zapi: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    "& ul": {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      "& li": {
        listStyle: "none",
        "& a": {
          textDecoration: "none",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "1rem",
          color: "#FFFFFF",
        },
        "& button": {
          textDecoration: "none",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "1rem",
          color: "#FFFFFF",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "Space Grotesk",
        },
      },
    },
    "@media screen and (max-width: 800px)": {
      display: "none",
    },
  },
  active: {
    borderBottom: "2px solid #FFEA00",
  },
  hamburger: {
    display: "block",
    cursor: "pointer",
    fontSize: "2rem",
    color: "#FFFFFF",
    zIndex: "1000",
  },
  mobileLinks: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    background: "#ccc",
    padding: "2rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    "& ul": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem",
    },
    "& li": {
      listStyle: "none",
      "& a": {
        textDecoration: "none",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "1rem",
        color: "#000000",
      },
    },
    "& button": {
      textDecoration: "none",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "1rem",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      outline: "none",
      fontFamily: "Space Grotesk",
    },
  },
  signup: {
    border: "none",
    borderRadius: "4px",
    padding: ".5rem 1rem",
    background: "#FFEA00",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#081F4A",
    cursor: "pointer",
  },
  logout: {
    border: "none",
    borderRadius: "4px",
    padding: ".5rem 1rem",
    background: "#FFEA00",
    fontWeight: 500,
    fontSize: "1rem",
    color: "black",
    cursor: "pointer",
  },
  dashboard: {
    border: "none",
    borderRadius: "4px",
    padding: ".5rem 1rem",
    background: "#FFFFFF",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#081F4A",
    cursor: "pointer",
  },
  mobile: {
    display: "none",
    "& ul": {},
  },
});
