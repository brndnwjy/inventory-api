const express = require("express");
const router = express.Router();

const { insert } = require("../controller/category.controller");

router.post("/", insert);

module.exports = router;
