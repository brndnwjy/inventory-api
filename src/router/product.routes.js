const express = require("express");
const router = express.Router();

const { insert, getAll, getDetail, update } = require("../controller/product.controller");
const upload = require("../middleware/multer");

router
.post("/", upload.single("photo"), insert)
.get("/", getAll)
.get("/:id", getDetail)
.put("/:id", upload.single("photo"), update)

module.exports = router;
