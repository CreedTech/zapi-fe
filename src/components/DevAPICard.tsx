import React from "react";
import { makeStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";
import {
  Avatar,
  CardHeader,
  IconButton,
  Paper,
  Box,
  Card,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { Animation, MoreVertRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  useAppDispatch,
  useAppSelector,
  useFormInputs,
  useHttpRequest,
} from "../hooks";
import { Spinner } from "../assets";
import { removeApi } from "../redux/slices/apiSlice";
import { useContextProvider } from "../contexts/ContextProvider";

interface CardProps {
  id: string;
  name: string;
  description: string;
  createdOn?: string;
  logo_url?: string;
}

// const core_url = import.meta.env.VITE_CORE_URL
const core_url = "VITE_CORE_URL";

const DevAPICard: React.FC<CardProps> = ({
  id,
  name,
  description,
  createdOn,
  logo_url,
}) => {
  const classes = useStyles();
  const { error, loading, sendRequest } = useHttpRequest();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  const { triggerRefresh } = useContextProvider();
  const dispatch = useAppDispatch();
  let payload: object;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteApi = async (e: any) => {
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        `/api/${id}?profileId=${profileId}`,
        "del",
        core_url,
        headers
      );
      if (!data || data === undefined) return;
      dispatch(removeApi(id));
      triggerRefresh();
      const { message } = data;
      toast.success(`${message}`);
    } catch (error) {}
  };

  return (
    <Paper className={classes.paper} sx={{ width: "395px", height: "255px" }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Card variant="outlined" className={classes.card}>
          <React.Fragment>
            <CardContent>
              <CardHeader
                avatar={
                  !logo_url ? (
                    <Avatar sx={{ bgcolor: blue[500], mb: 1, mr: 5, ml: -2 }}>
                      <Animation />
                    </Avatar>
                  ) : (
                    <img className={classes.logo} src={logo_url} />
                  )
                }
                action={
                  <IconButton
                    aria-label="settings"
                    id="menuButton"
                    aria-controls={open ? "cardMenu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}>
                    <MoreVertRounded />
                  </IconButton>
                }
              />

              <Menu
                id="cardMenu"
                MenuListProps={{
                  "aria-labelledby": "menuButton",
                  disablePadding: true,
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={handleDeleteApi}>
                  {loading ? <Spinner /> : "Delete"}
                </MenuItem>
              </Menu>

              <Link to={`/developer/api/${id}`} style={{ color: "#081F4A" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontSize: "18px", fontWeight: "500", mb: 1 }}>
                  {name || "👋 Onboarding Project"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {description.length > 100
                    ? `${description.substring(0, 100)}...`
                    : description ||
                      "This project is created by the onboarding process "}
                </Typography>
              </Link>
            </CardContent>
            <Typography
              variant="subtitle1"
              sx={{ margin: 1.5, marginLeft: 2.5, fontSize: "14px" }}
              color="text.secondary">
              created:{" "}
              {(createdOn && new Date(createdOn).toLocaleDateString()) ||
                "Updated"}
              {/* or new Date(date).toDateString() : this will include the day */}
            </Typography>
          </React.Fragment>
        </Card>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles({
  paper: {
    transition: "all 0.5s ease-in-out",
    "&:hover": {
      boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.4)",
    },
  },
  card: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "50%",
  },
});

export default DevAPICard;
