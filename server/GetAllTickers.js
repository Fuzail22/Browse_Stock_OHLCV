require("dotenv").config();
const axios = require("axios");
const APIkey = process.env.polygonAPIKey;

async function getAllTickers(baseUrl, apiKey) {
  try {
    let allTickers = [];

    let url = baseUrl;
    while (url) {
      const response = await axios.get(url, {
        params: {
          apiKey: apiKey,
        },
      });

      const tickers = response.data.results;
      allTickers = allTickers.concat(tickers);

      url = response.data.next_url;
    }

    return allTickers;
  } catch (error) {
    console.error("Error fetching tickers:", error.message);
    throw error;
  }
}

const apiKey = APIkey;
const baseUrl = "https://api.polygon.io/v3/reference/tickers";

getAllTickers(baseUrl, apiKey)
  .then((tickers) => {
    console.log("List of all tickers:", tickers);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });
