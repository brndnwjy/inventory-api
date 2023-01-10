const express = require("express");
const router = express.Router();

const { insert, getAll, getDetail } = require("../controller/category.controller");

router
.post("/", insert)
.get("/", getAll)
.get("/:id", getDetail)

module.exports = router;
