require("dotenv").config();

// server
const express = require("express");
const app = express();

// import packages
const bp = require("body-parser");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");

// parser
app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);

// security
app.use(cors());
app.use(helmet());
app.use(xss());

// logger
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
