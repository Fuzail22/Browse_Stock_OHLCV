const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/TestSearch", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
const Stock = mongoose.model("Ticker", tickerSchema);

app.use(cors());
app.use(express.json());

app.get("/api/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const regex = new RegExp(searchQuery, "i");
    const stocks = await Stock.find({ name: regex }).select("name");
    res.json(stocks);
  } catch (error) {
    console.error("Error searching stocks:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
