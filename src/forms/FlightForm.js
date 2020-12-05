import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SaveIcon from "@material-ui/icons/Save";
import { Col, Row } from "styled-bootstrap-grid";

const FlightForm = (props) => {
  const initFlight = { id: null, startDate: null, endDate: null, type: "1" };
  const [flight, setFlight] = useState(initFlight);
  const [disableEndDate, setDisableEndDate] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "type" && value === "1") {
      setDisableEndDate(false);
    } else {
      setDisableEndDate(true);
    }
    setFlight({ ...flight, [name]: value });
  };

  const handleStartDate = (date) => {
    setFlight({ ...flight, startDate: date });
  };

  const handleEndDate = (date) => {
    setFlight({ ...flight, endDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flight.startDate && flight.type) {
      handleChange(e, props.addFlight(flight));
      setFlight({ id: null, startDate: null, endDate: null, type: "1" });
      setDisableEndDate(false);
    }
  };

  return (
    <form>
      <Row>
        <Col col xl="12" lg="12" md="12" sm="12">
          <RadioGroup
            row
            aria-label="Type"
            name="type"
            value={flight.type}
            onChange={handleChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="One way Flight"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Return Flight"
            />
          </RadioGroup>
          <MuiPickersUtilsProvider name="startDate" utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              name="startDate"
              label="Start Date"
              value={flight.startDate}
              onChange={handleStartDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              name="endDate"
              label="End Date"
              disabled={disableEndDate}
              value={flight.endDate}
              onChange={handleEndDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Col>
        <Col col xl="12" lg="12" md="12" sm="12">
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            {flight.id === null ? "Save" : "Update"}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default FlightForm;
