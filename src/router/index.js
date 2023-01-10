const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");

router.use("/user", userRoutes).use("/category", categoryRoutes);

module.exports = router;
