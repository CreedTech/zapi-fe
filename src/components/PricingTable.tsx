import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


function createData(
    statushead: string,
    search: number | string,
    features: number | string,
    payperuse: number | string,
    freetouse: number | string,
  ) {
    return { statushead, search, features, payperuse, freetouse };
  }
  
  const rows = [
    createData('Status (Related Endpoints)', '', '', '', ''),
    createData('Search (Related Endpoints)', '600 / month', '50, 000 / month', '100, 000 / month', 'Unlimited'),
    createData('Features', '', '', '', ''),
    createData('Pay Per Use', 'X', 'X', 'X', 'X'),
    createData('Free To Use', 'X', 'X', 'X', 'X'),
    createData('Rate Limit', '', '', '', '12000 requests per hour'),
  ];  

const PricingTable:React.FC = () => {


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
                Objects
            </TableCell>
            <TableCell sx={{ fontSize: 25, fontWeight: 400, lineHeight: 1.5 }} align="center"> 
                Basic <br /> $0.00 / mo <br />
                <Button style={{textTransform: "none"}}variant='contained'>
                Subscribe
              </Button>
            </TableCell>
            <TableCell sx={{ fontSize: 25, fontWeight: 400, lineHeight: 1.5 }} align="center">
                Pro <br /> $100.00 / mo <br />
                <Button style={{textTransform: "none"}} disabled variant='contained'>
                Subscribe
              </Button>
            </TableCell>
            <TableCell sx={{ fontSize: 25, fontWeight: 400, lineHeight: 1.5 }} align="center">
                Ultra <br /> $200.00 / mo <br />
                <Button style={{textTransform: "none"}} disabled variant='contained'>
                Subscribe
              </Button>
            </TableCell>
            <TableCell sx={{ fontSize: 25, fontWeight: 400, lineHeight: 1.5 }} align="center">
                Mega <br /> $700.00 / mo <br />
                <Button  style={{textTransform: "none"}} disabled variant='contained'>
                Subscribe
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.statushead}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.statushead}
              </TableCell>
              <TableCell align="right">{row.search}</TableCell>
              <TableCell align="right">{row.features}</TableCell>
              <TableCell align="right">{row.payperuse}</TableCell>
              <TableCell align="right">{row.freetouse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PricingTable

