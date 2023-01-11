const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const config = {
    expiresIn: "6h",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, config);

  return token;
};

const generateRefreshToken = (payload) => {
  const config = {
    expiresIn: "24h",
  };
  const token = jwt.sign(payload, process.env.JWT_REFRESH_KEY, config);

  return token;
};

module.exports = { generateToken, generateRefreshToken };
