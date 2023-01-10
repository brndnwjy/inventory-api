require("dotenv").config();

// server
const express = require("express");
const app = express();

const main = require("./src/router");
const PORT = process.env.PORT || 4000;

// import packages
const bp = require("body-parser");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

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

// route
app.use("/v1", main);

app.use("/img", express.static(path.join(__dirname, "/uploads")));

app.all("*", (req, res, next) => {
  next(
    res.send({
      message: "page not found",
    })
  );
});

app.use((err, req, res, next) => {
  const errorCode = err.status || 500;
  const errorMessage = err.message || "internal server error";

  res.status(errorCode).send({
    message: errorMessage,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
