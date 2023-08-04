// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
  const symbol = req.body.symbol.toUpperCase();
  const selectedDate = req.body.selectedDate;
  await axios
    .get(
      `https://api.polygon.io/v1/open-close/${symbol}/${selectedDate}?adjusted=true&apiKey=ejTMclW2dM_RdTKJPvLfmdktVDXxZndu`
    )
    .then((response) => {
      const { open, close, high, low, volume } = response.data;
      const data = { open, close, high, low, volume };
      console.log(data);
      res.status(200).json(data);
    })
    .catch(async (error) => {
      if (error.response) {
        errorStatus = error.response.status;
        msg = error.response.data.message || error.response.data.error;
        console.log(errorStatus, msg);
        res.status(errorStatus).json(msg);
      } else {
        console.error("Error:", error.message);
      }
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
