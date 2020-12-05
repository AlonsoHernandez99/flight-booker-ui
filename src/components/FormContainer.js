import { useEffect, useState } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid";
import flightsRequests from "../hooks/flightsRequests";
import FlightForm from "../forms/FlightForm";
import FlightTable from "./FlightTable";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
const API = require("../utils/constants").API;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FormContainer() {
  const classes = useStyles();

  const [flights, setFlights] = useState([]);
  const [data, loading] = flightsRequests(3);

  useEffect(() => {
    if (data) {
      setFlights(data.flights);
    }
  }, [data]);

  const addFlight = (flight) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    };
    fetch(`${API}/flight`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setFlights([...flights, data.body]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <FlightForm addFlight={addFlight} />
        </Grid>
        <Grid item xs={7}>
            <FlightTable flights={flights} />
        </Grid>
      </Grid>
    </Container>
  );
}
