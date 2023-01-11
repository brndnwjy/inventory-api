const express = require("express");
const router = express.Router();

const {
  insert,
  getAll,
  getDetail,
  update,
  remove,
} = require("../controller/product.controller");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/multer");

router
  .post("/", verifyToken, upload.single("photo"), insert)
  .get("/", getAll)
  .get("/:id", getDetail)
  .put("/:id", verifyToken, upload.single("photo"), update)
  .delete("/:id", verifyToken, remove);

module.exports = router;
