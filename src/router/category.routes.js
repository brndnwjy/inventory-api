const express = require("express");
const router = express.Router();

const {
  insert,
  getAll,
  getDetail,
  update,
  remove,
} = require("../controller/category.controller");

router
  .post("/", insert)
  .get("/", getAll)
  .get("/:id", getDetail)
  .put("/:id", update)
  .delete("/:id", remove);

module.exports = router;
