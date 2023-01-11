const express = require("express");
const router = express.Router();

const {
  insert,
  getAll,
  getDetail,
  update,
  remove,
} = require("../controller/category.controller");
const verifyToken = require("../middleware/auth");

router
  .post("/", verifyToken, insert)
  .get("/", getAll)
  .get("/:id", getDetail)
  .put("/:id", verifyToken, update)
  .delete("/:id", verifyToken, remove);

module.exports = router;
