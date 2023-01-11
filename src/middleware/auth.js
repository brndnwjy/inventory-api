const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyToken = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.decoded = decoded;
      next();
    } else {
      res.status(401).send({
        message: "token not found",
      });
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      next(createError(400, "token invalid "));
    } else if (err.name === "TokenExpiredError") {
      next(createError(400, "token expired"));
    } else {
      next(createError(400, "error occured"));
    }
  }
};

module.exports = verifyToken;
