import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector, useHttpRequest } from "../hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubscribedUsers } from "../redux/slices/userSlice";

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

const AnalyticsUser = () => {
  const { sendRequest } = useHttpRequest();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { subscribedUsers } = useAppSelector((store) => store.user);

  useEffect(() => {
    dispatch(getSubscribedUsers(id));
  }, [id]);

  return (
    <Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribedUsers ? (
            subscribedUsers.map((user: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell>
                No user has subscribed to this API yet!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AnalyticsUser;
