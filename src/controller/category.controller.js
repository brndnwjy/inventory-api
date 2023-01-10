const categoryModel = require("../model/category.model");

const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const categoryController = {
  insert: async (req, res, next) => {
    try {
      // prepare category data
      const id = uuid();
      const { title } = req.body;
      const date = new Date();

      const data = {
        id,
        title,
        date,
      };

      // insert new category
      await categoryModel.insert(data);

      res.send({
        message: "insert product success",
        category: data,
      });
    } catch {
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = categoryController;
