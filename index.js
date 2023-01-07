require("dotenv").config();

// server
const express = require("express");
const app = express();

// import packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

// security
app.use(cors());
app.use(helmet());
app.use(xss());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
