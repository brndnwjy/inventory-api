const { v4: uuid } = require("uuid");
const { hash } = require("bcryptjs");
const createError = require("http-errors");
const userModel = require("../model/user.model");

const userController = {
  register: async (req, res, next) => {
    try {
      const { fullname, email, password } = req.body;

      const { rowCount: check } = await userModel.emailCheck(email);

      if (check) {
        return next(createError(403, "email already registered"));
      }

      const id = uuid();
      const hashedPassword = await hash(password, 10);
      const date = new Date();

      const data = {
        id,
        fullname,
        email,
        password: hashedPassword,
        date,
      };

      await userModel.register(data);

      delete data.password;

      res.send({
        message: "register success",
        user: data,
      });
    } catch {
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = userController;
