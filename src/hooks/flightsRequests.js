import { useState, useEffect } from "react";
const API = require("../utils/constants").API;

const FlightsRequests = (amount) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/flight`);
        const json = await response.json();
        setData(json, setLoading(false));
      } catch (err) {
        console.warn("Error in get all Flights", err);
        setLoading(false);
      }
    };

    if (amount) {
      fetchData(amount);
    }
  }, [amount]);

  return [data, loading];
};

export default FlightsRequests;
