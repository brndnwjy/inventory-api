const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const config = {
    expiresIn: "6h",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, config);

  return token;
};

module.exports = { generateToken };
