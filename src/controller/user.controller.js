const userModel = require("../model/user.model");

const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");
const { generateToken } = require("../helper/auth");

const userController = {
  register: async (req, res, next) => {
    try {
      // get user input
      const { fullname, email, password } = req.body;

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
    } catch {
      next(createError(500, "internal server error"));
    }
  },

  login: async (req, res, next) => {
    try {
      // get user input
      const { email, password } = req.body;

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
      const token = generateToken({
        id: user.user_id,
        name: user.fullname,
        email: user.email,
      });

      delete user.password;

      res.send({
        message: "login success",
        user,
        token,
      });
    } catch (err) {
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = userController;
