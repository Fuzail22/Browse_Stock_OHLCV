require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const APIkey = process.env.polygonAPIKey;
const connectString = process.env.connectString;
const cloudConnectString = process.env.cloudConnectString;
console.log("connect string is ",cloudConnectString);
mongoose
  .connect(`${cloudConnectString}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connection successfull");
  })
  .catch((error) =>
    console.log(
      "The following error occured while trying to connect to mmongoDB",
      error
    )
  );
mongoose
  .connect(cloudConnectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connection successfull");
  })
  .catch((error) =>
    console.log(
      "The following error occured while trying to connect to mmongoDB",
      error
    )
  );
const tickerSchema = new mongoose.Schema({
  name: String,
  active: String,
  cik: String,
  composite_figi: String,
  currency_name: String,
  last_updated_utc: String,
  locale: String,
  market: String,
  primary_exchange: String,
  share_class_figi: String,
  ticker: String,
  type: String,
});
const Stock = mongoose.model("StockList", tickerSchema);
app.use(cors());
app.get("/api/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const regex = new RegExp(searchQuery, "i");
    const stocks = await Stock.find({ name: regex }).select("name ticker");
    console.log("Retrieved From DB");
    res.json(stocks);
  } catch (error) {
    console.error("Error searching stocks:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.use(function (req, res, next) {
//   const allowedOrigins = ["http://localhost:3000"];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//   next();
// });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Welcome to Browse_Stock_OHLC-V Endpoint home, API server is up and running"
    );
});
app.post("/api/fetchStockData", async (req, res) => {
  const symbol = req.body.symbol.toUpperCase();
  const selectedDate = req.body.selectedDate;
  await axios
    .get(
      `https://api.polygon.io/v1/open-close/${symbol}/${selectedDate}?adjusted=true&apiKey=${APIkey}`
    )
    .then((response) => {
      const { open, close, high, low, volume } = response.data;
      const data = { open, close, high, low, volume };
      // console.log(data);
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
