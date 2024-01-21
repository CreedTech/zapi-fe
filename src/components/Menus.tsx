import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Fade,
  Menu,
  MenuItem,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  HelpOutline,
  AppsRounded,
  DeveloperBoardRounded,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";

import { ZapiDash, ZapiApps, ZapiHelp, ZapiArrow, ZapiPic } from "../assets";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { getUserApis, logout } from "../redux/slices/userSlice";
import Notification from "./Notification";

interface MenuProps {
  id?: string;
}

const Menus: React.FC<MenuProps> = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isAvatarOpen = Boolean(anchorE2);
  const [socket, setSocket] = useState<any>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { userApis } = useAppSelector((store) => store.user);

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SOCKET_URL));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleLogout = async () => {
    await setAnchorE2(null);
    dispatch(logout());
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("profileId");
    cookies.remove("userId");
    cookies.remove("secretKey");
    navigate("/");
  };

  return (
    <div className={classes.items}>
      <Button
        className={classes.root}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        All Projects
        <img
          src={ZapiArrow}
          alt="zapi-arrow"
          style={{ color: "#00000", marginLeft: "0.4rem" }}
        />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        {userApis.map((api, index) => (
          <MenuItem key={index} className={classes.menuItem}>
            <NavLink
              to={`/developer/api/${api.id}`}
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "#000000" }
              }>
              {api.name}
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}>
        <DeveloperBoardRounded />
        <AppsRounded />
        <HelpOutline />
        <Notification socket={socket} />
      </Stack>

      <Button
        aria-controls={isAvatarOpen ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isAvatarOpen ? "true" : undefined}
        onClick={handleAvatarClick}>
        <Avatar src={ZapiPic} alt="zapi-pic" />
      </Button>
      <Menu
        anchorEl={anchorE2}
        open={isAvatarOpen}
        onClose={handleClose2}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const useStyles = makeStyles({
  icons: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    width: "inherit",
  },
  items: {
    alignItems: "center",
    display: "flex",
    width: "450px",
    gap: "2rem",
  },
  menuItem: {
    "&.MuiMenuItem-root": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "15px",
      fontWeight: "normal",
      textAlign: "center",
      lineHeight: "25px",
    },
  },
  root: {
    width: "450px",
    "&.MuiButton-text": {
      color: "black",
    },
    "&.MuiButton-root": {
      textTransform: "none",
      fontSize: "16px",
    },
  },
});

export default Menus;
