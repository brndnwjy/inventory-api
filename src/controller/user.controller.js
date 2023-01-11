const userModel = require("../model/user.model");

const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { generateToken, generateRefreshToken } = require("../helper/auth");
const { registerSchema, loginSchema } = require("../helper/schema");

const userController = {
  register: async (req, res, next) => {
    try {
      // get user input
      const { fullname, email, password } = req.body;

      const value = registerSchema.validate({ fullname, email, password });

      if (value.error) {
        const error = value.error.details[0];

        return next(createError(400, error));
      }

      // check if email already registered
      const { rowCount: check } = await userModel.emailCheck(email);

      if (check) {
        return next(createError(403, "email already registered"));
      }

      // init user data for registration
      const id = uuid();
      const hashedPassword = await hash(password, 10);
      const date = new Date();

      const user = {
        id,
        fullname,
        email,
        password: hashedPassword,
        date,
      };

      // register new user
      await userModel.register(user);

      delete user.password;

      res.send({
        message: "register success",
        user,
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },

  login: async (req, res, next) => {
    try {
      // get user input
      const { email, password } = req.body;

      // validate input
      const value = loginSchema.validate({ email, password });

      if (value.error) {
        const error = value.error.details[0];

        return next(createError(400, error));
      }

      // check if email already registered
      const result = await userModel.emailCheck(email);

      const check = result.rowCount;

      if (!check) {
        return next(createError(401, "email or password incorrect"));
      }

      // verify user password
      const user = result.rows[0];

      const valid = await compare(password, user.password);

      console.log(valid);

      if (!valid) {
        return next(createError(401, "email or password incorrect"));
      }

      // generate token
      const payload = {
        id: user.user_id,
        name: user.fullname,
        email: user.email,
      };

      const token = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);

      delete user.password;

      res.send({
        message: "login success",
        user,
        token,
        refreshToken,
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },

  refreshToken: (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

      const payload = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      };

      const newToken = generateToken(payload);
      const newRefreshToken = generateRefreshToken(payload);

      res.send({
        message: "token refresh success",
        data: { token: newToken, refreshToken: newRefreshToken },
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = userController;
