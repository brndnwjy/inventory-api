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

  getAll: async (req, res, next) => {
    try {
      // request to database
      const result = await categoryModel.getAll();

      // data validation
      const check = result.rowCount;

      if (!check) {
        return res.send({
          message: "no category recorded",
        });
      }

      // get category data
      const category = result.rows;

      res.send({
        message: "get all category success",
        category,
      });
    } catch {
      next(createError(500, "internal server error"));
    }
  },

  getDetail: async (req, res, next) => {
    try {
      // get parameter
      const { id } = req.params;

      // request to database
      const result = await categoryModel.getDetail(id);

      // data validation
      const check = result.rowCount;

      if (!check) {
        return res.send({
          message: "no category recorded with corresponding id",
        });
      }

      // get category data
      const category = result.rows[0];

      res.send({
        message: "get category detail success",
        category,
      });
    } catch {
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = categoryController;
