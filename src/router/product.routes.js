const express = require("express");
const router = express.Router();

const {
  insert,
  getAll,
  getDetail,
  update,
  remove,
} = require("../controller/product.controller");
const upload = require("../middleware/multer");

router
  .post("/", upload.single("photo"), insert)
  .get("/", getAll)
  .get("/:id", getDetail)
  .put("/:id", upload.single("photo"), update)
  .delete("/:id", remove);

module.exports = router;
