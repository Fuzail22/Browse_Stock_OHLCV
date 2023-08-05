const axios = require("axios");
const mongoose = require("mongoose");
const apiKey = "ejTMclW2dM_RdTKJPvLfmdktVDXxZndu";
const baseUrl = "https://api.polygon.io/v3/reference/tickers";
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
const TickerModel = mongoose.model("Ticker", tickerSchema);

async function saveTickersToDatabase(tickers) {
  try {
    await TickerModel.insertMany(tickers);
    console.log("Tickers saved to the database.");
  } catch (error) {
    console.error("Error saving tickers to the database:", error.message);
    throw error;
  }
}

async function getAllTickers(baseUrl, apiKey) {
  try {
    const requestsPerMinute = 5;
    const interval = (60 * 1000) / requestsPerMinute;

    let allTickers = [];
    let url = baseUrl;

    while (url) {
      const response = await axios.get(url, {
        params: {
          apiKey: apiKey,
        },
      });

      const tickers = response.data.results;

      await saveTickersToDatabase(tickers);

      allTickers = allTickers.concat(tickers);

      url = response.data.next_url;

      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return allTickers;
  } catch (error) {
    console.error("Error fetching tickers:", error.message);
    throw error;
  }
}

mongoose
  .connect("mongodb://localhost:27017/BrowseStock", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");

    getAllTickers(baseUrl, apiKey)
      .then((tickers) => {
        console.log("List of all tickers:", tickers);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
