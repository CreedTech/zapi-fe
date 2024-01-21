import { makeStyles } from "@mui/styles";
import {
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Table,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector, useHttpRequest } from "../hooks";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  ContentCopy,
  ContentCopyOutlined,
  Unsubscribe,
} from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import Cookies from "universal-cookie";
import { useContextProvider } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";

const core_url = "VITE_CORE_URL";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#081f4A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Subscription: React.FC = () => {
  const { subscribedApis, userApis } = useAppSelector((store) => store.user);
  const classes = useStyles();
  const { error, loading, sendRequest } = useHttpRequest();
  const [copied, setCopied] = useState<boolean>(false);
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const profileId = cookies.get("profileId");
  const { triggerRefresh } = useContextProvider();

  ReactGA.send({ hitType: "pageview", page: "/subscriptionTab" });

  const revoke = async (e: SyntheticEvent, apiId: string) => {
    e.preventDefault();

    const headers = { "Content-Type": "application/json" };
    const queryStringParameters = { profileId };
    try {
      const data = await sendRequest(
        `/subscription/revoke/${apiId}`,
        "post",
        core_url,
        undefined,
        headers,
        queryStringParameters
      );
      if (!data || data === undefined) return;
      triggerRefresh();
      const { message } = data;
      toast.success(`${message}`);
    } catch (error) {}
  };

  const unsubscribe = async (e: SyntheticEvent, apiId: string) => {
    e.preventDefault();

    const headers = { "Content-Type": "application/json" };
    const queryStringParameters = { profileId };
    try {
      const data = await sendRequest(
        `/subscription/unsubscribe/${apiId}`,
        "post",
        core_url,
        undefined,
        headers,
        queryStringParameters
      );
      if (!data || data === undefined) return;
      triggerRefresh();
      const { message } = data;
      toast.success(`${message}`);
    } catch (error) {}
  };
  const copyButton = (e: SyntheticEvent, token: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(token);
    //alert("Token Copied!");
  };
  return (
    <div>
      {subscribedApis.length !== 0 ? (
        <div className={classes.subTable}>
          <Table>
            <TableHead>
              <TableRow className={classes.root}>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Token</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscribedApis?.map((api, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{api.name}</StyledTableCell>
                  <StyledTableCell>
                    {"..." + api.token.slice(217, 280)}{" "}
                    <Button onClick={(e) => copyButton(e, api.token)}>
                      <ContentCopy />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 50 }}>
                    <Link to={`/api/${api.apiId}`} className={classes.Link}>
                      View
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 50 }}>
                    <button
                      className={classes.button}
                      onClick={(e) => unsubscribe(e, api.apiId)}>
                      Unsubscribe
                    </button>
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 50 }}>
                    <button
                      className={classes.button1}
                      onClick={(e) => revoke(e, api.apiId)}>
                      Revoke
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className={classes.addApiDesc}>
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
            You have not subscribed to any API Project
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
            Visit the Hub to subscribe to an API
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Subscription;

const useStyles = makeStyles({
  subTable: {
    margin: "2rem auto 0 auto",
    padding: "0",
    width: "90%",
  },
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#081f4A",
    },
  },
  Link: {
    padding: "10px",
    borderRadius: "5px",
    background: "#26c340",
    color: "#fff",
    pointer: "cursor",
    fontSize: "15px",
  },
  addApiDesc: {
    marginTop: "20px",
    paddingBottom: "80px",
    height: "calc(100vh - 315px)",
  },
  button: {
    background: "#274974",
    color: "white",
    border: "none",
    fontSize: "15px",
  },
  button1: {
    background: "#e83f33",
    color: "white",
    fontSize: "15px",
  },
});
