import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Cookies from "universal-cookie";

import {
  useAppDispatch,
  useAppSelector,
  useFormInputs,
  useHttpRequest,
} from "../hooks";
import { removeEndpoint, editEndpoint } from "../redux/slices/userSlice";
import { EndpointProps } from "../interfaces";
import { Spinner } from "../assets";

const core_url = "VITE_CORE_URL";
const initialState = {
  id: "",
  name: "",
  route: "",
  method: "",
} as EndpointProps;

interface Props {
  id: string | undefined;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: "auto",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: "auto",
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

const CollapsibleTable: React.FC<Props> = ({ id }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const { userApis } = useAppSelector((store) => store.user);
  const { error, loading, sendRequest } = useHttpRequest();
  const { inputs, bind, select } = useFormInputs(initialState);
  const api = userApis.find((api) => api?.id === id);
  const { name, route, method } = inputs;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const cookies = new Cookies();
  let payload: object;

  const openEditing = (index: number) => {
    setIsEditing(index);
  };

  const save = async (id: string | undefined) => {
    if (!name || !method || !route) {
      toast.error("No changes made");
      setIsEditing(null);
      return;
    }
    payload = { id, name, method, route };
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        `/endpoints/${id}`,
        "patch",
        core_url,
        payload,
        headers
      );
      if (!data || data === undefined) return;
      dispatch(editEndpoint(payload));
      setIsEditing(null);
      const { message } = data;
      toast.success(`${message}`);
    } catch (error) {}
  };

  const deleteRoute = async (id: string | undefined) => {
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        `/endpoints/${id}?profileId=${cookies.get("profileId")}`,
        "del",
        core_url,
        payload,
        headers
      );
      if (!data || data === undefined) return;
      dispatch(removeEndpoint(id));
    } catch (error) {}
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className={classes.root}>
              <TableCell>Name</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Route</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {api?.endpoints?.map((endpoint, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <input
                    type="text"
                    name="name"
                    defaultValue={endpoint?.name}
                    {...bind}
                    className={classes.input}
                    disabled={isEditing !== index}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <select
                    name="method"
                    defaultValue={endpoint?.method}
                    {...select}
                    className={classes.input}
                    disabled={isEditing !== index}>
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="patch">PATCH</option>
                    <option value="delete">DELETE</option>
                  </select>
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="text"
                    name="route"
                    defaultValue={endpoint?.route.toString()}
                    {...bind}
                    className={classes.input}
                    disabled={isEditing !== index}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {isEditing === index ? (
                    <button
                      onClick={() => save(endpoint?.id)}
                      className={classes.button}
                      style={{ background: "#10c96b" }}>
                      DONE
                    </button>
                  ) : (
                    <button
                      onClick={() => openEditing(index)}
                      className={classes.button}
                      style={{ background: "#c5c5c5" }}>
                      EDIT
                    </button>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <button
                    onClick={() => deleteRoute(endpoint?.id)}
                    className={classes.button}
                    style={{ background: "#e83f33" }}>
                    {loading ? <Spinner /> : "DELETE"}
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    padding: "0 1rem",
    gap: "1rem",
  },
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#081f4A",
    },
  },
  input: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    borderRadius: "4px",
    border: "1px solid #999",
    outline: "none",
    padding: "0 0.5rem",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    fontFamily: "var(--body-font)",
    transition: "0.5s all ease-in-out cubic-bezier(0.075, 0.82, 0.165, 1)",
    "&:disabled": {
      border: "none",
      background: "#FFF",
      color: "#000",
    },
  },
  button: {
    padding: "0.5rem 1rem",
    border: "none",
    outline: "none",
    borderRadius: "5px",
    color: "#FFF",
    cursor: "pointer",
    fontFamily: "var(--body-font)",
  },
});

export default CollapsibleTable;
