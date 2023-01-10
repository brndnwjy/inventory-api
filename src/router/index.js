const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");

router
  .use("/user", userRoutes)
  .use("/category", categoryRoutes)
  .use("/product", productRoutes);

module.exports = router;
