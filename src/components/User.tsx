import React from "react";
import { styled } from '@mui/material/styles';
import {
    Button,
    ButtonGroup,
    InputAdornment,
    TextField,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    tableCellClasses,
    TableRow
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";



const User = () => {
    const classes = useStyles()
    
    return (
    <div className={classes.user}>
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "flex-end" }}>
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
                size="small" />
            <ButtonGroup
                sx={{
                    height: "40px",
                    "& button:focus" : {backgroundColor: "grey.300"}
                }}>
                <Button sx={{lineHeight: 1}}>Paid Users(0)</Button>
                <Button sx={{lineHeight: 1}}>Free Users(1)</Button>
            </ButtonGroup>
        </div>
        <TableContainer className={classes.tableContainer}>
        <Table sx={{
            border:1,
            borderColor: "grey.300",
            borderRadius: "10px",
            height: "300px",
        }}
        stickyHeader>
            <TableHead>
                <TableRow className={classes.root}>
                    <TableCell><strong>Username</strong></TableCell>
                    <TableCell align="right"><strong>status</strong></TableCell>
                    <TableCell align="right"><strong>Name</strong></TableCell>
                    <TableCell align="right"><strong>Date Subscribed</strong></TableCell>
                    <TableCell align="right"><strong>Plan Name</strong></TableCell>
                    <TableCell align="right"><strong>Total paid</strong></TableCell>
                    <TableCell align="right"><strong>Last Active</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <tr>
                    <td>No users to display</td>
                </tr>
            </TableBody>
        </Table>
        </TableContainer>
    </div>
)};

export default User;

const useStyles = makeStyles({
    user: {
        // width: "calc(100% - 250px)"
    },
    root:{
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#081f4A"
        }
    },
    tableContainer: {
        ['@media (max-width:450px)']:{
            maxWidth:'320px'
        }
    }
})