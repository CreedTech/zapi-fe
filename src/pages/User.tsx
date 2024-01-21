import React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
}));

const User = () => (
  <>
    <div
      style={{
        display: "flex",
        position: "relative",
        left: "620px",
        padding: "10px",
      }}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ padding: "10px" }}
        id="outlined-size-small"
        placeholder="search username"
        size="small"
      />
      <ButtonGroup
        style={{ position: "relative", top: "10px" }}
        sx={{
          height: "40px",
          "& button:focus": { backgroundColor: "grey.300" },
        }}>
        <Button>Paid Users(0)</Button>
        <Button>Free Users(1)</Button>
      </ButtonGroup>
    </div>
    <Table
      sx={{
        border: 1,
        borderColor: "grey.300",
        borderRadius: "10px",
        height: "300px",
      }}>
      <TableHead>
        <TableRow>
          <StyledTableCell>
            <strong>Username</strong>
          </StyledTableCell>
          <StyledTableCell align="right">
            <strong>status</strong>
          </StyledTableCell>
          <StyledTableCell align="right">
            <strong>Name</strong>
          </StyledTableCell>
          <StyledTableCell align="right">
            <strong>Date Subscribed</strong>
          </StyledTableCell>
          <StyledTableCell align="right">
            <strong>Plan Name</strong>
          </StyledTableCell>
          <StyledTableCell align="right">
            <strong>Total paid</strong>
          </StyledTableCell>
          <StyledTableCell align="right">
            <strong>Last Active</strong>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <tr>
          <td>No users to display</td>
        </tr>
      </TableBody>
    </Table>
  </>
);

export default User;
