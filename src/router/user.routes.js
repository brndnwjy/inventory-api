const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refreshToken,
} = require("../controller/user.controller");

router
  .post("/register", register)
  .post("/login", login)
  .post("/refresh-token", refreshToken);

module.exports = router;
