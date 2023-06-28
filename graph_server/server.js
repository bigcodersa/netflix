const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    req.headers["origin"] = "https://app.uniswap.org";
    req.headers["referer"] = "https://app.uniswap.org/";
    delete req.headers["host"];
    console.log(req.headers)
    const uniswapResponse = await axios.post("https://api.uniswap.org/v1/graphql", req.body, { headers: req.headers });
    res.json(uniswapResponse.data);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.log("Response Data:", error.response.data);
      console.log("Response Status:", error.response.status);
      console.log("Response Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request:", error.request);
    }
    res.status(500).json({ error: "Failed to fetch from Uniswap API" });
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
