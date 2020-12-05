import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";

const FlightTable = (props) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-labelledby="tableTitle"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>START DATE</strong>
              </TableCell>
              <TableCell align="left">
                <strong>END DATE</strong>
              </TableCell>
              <TableCell align="left">
                <strong>FLIGHT TYPE</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.flights.map((flight) => (
              <TableRow key={flight._id}>
                <TableCell component="th" scope="row">
                  <Moment format="DD/MM/YYYY">{flight.startDate}</Moment>
                </TableCell>
                <TableCell component="th" scope="row">
                  {flight.type === 1 ? (
                    <Moment format="DD/MM/YYYY">{flight.endDate}</Moment>
                  ) : (
                    <span>---</span>
                  )}
                </TableCell>
                <TableCell align="left">
                  {flight.type === 1 ? "One way flight" : "Return flight"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FlightTable;
