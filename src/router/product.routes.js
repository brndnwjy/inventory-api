const express = require("express");
const router = express.Router();

const { insert } = require("../controller/product.controller");
const upload = require("../middleware/multer");

router
.post("/", upload.single("photo"), insert);

module.exports = router;
