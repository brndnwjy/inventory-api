const productModel = require("../model/product.model");

const { v4: uuid } = require("uuid");
const createError = require("http-errors");
const { productSchema } = require("../helper/schema");

const productController = {
  insert: async (req, res, next) => {
    try {
      // get user input
      const { cid, title, description, stock } = req.body;

      // validate input
      const value = productSchema.validate({ cid, title, description, stock });

      if (value.error) {
        const error = value.error.details[0];

        return next(createError(400, error));
      }

      // prepare product data
      const id = uuid();
      let photo = null;
      const date = new Date();

      // validate file input
      if (req.file) {
        photo = `http://${req.get("host")}/img/${req.file.filename}`;
      }

      const data = {
        id,
        cid,
        title,
        description,
        stock,
        photo,
        date,
      };

      // insert new product
      await productModel.insert(data);

      res.json({
        message: "insert product success",
        product: data,
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },

  getAll: async (req, res, next) => {
    try {
      // request to database
      const result = await productModel.getAll();

      // data validation
      const check = result.rowCount;

      if (!check) {
        return res.send({
          message: "no product recorded",
        });
      }

      // get product data
      const product = result.rows;

      res.send({
        message: "get all product success",
        product,
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
      const result = await productModel.getDetail(id);

      // data validation
      const check = result.rowCount;

      if (!check) {
        return res.send({
          message: "no product recorded with corresponding id",
        });
      }

      // get product data
      const product = result.rows[0];

      res.send({
        message: "get product detail success",
        product,
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },

  update: async (req, res, next) => {
    try {
      // get parameter
      const { id } = req.params;

      // request to database
      const result = await productModel.getDetail(id);

      // data validation
      const check = result.rowCount;

      if (!check) {
        return res.send({
          message: "no product recorded with corresponding id",
        });
      }

      // get old product data
      const oldProduct = result.rows[0];

      // prepare update data
      const { cid, title, description, stock } = req.body;
      let photo;
      const date = new Date();

      let data = {
        id,
        cid,
        title,
        description,
        stock,
        date,
        photo,
      };

      if (req.file) {
        data = {
          ...data,
          photo: `http://${req.get("host")}/img/${req.file.filename}`,
        };
      }

      // update product
      await productModel.update(data);

      // get product data after update
      const {
        rows: [newProduct],
      } = await productModel.getDetail(id);

      res.send({
        message: "update product success",
        old: oldProduct,
        new: newProduct,
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },

  remove: async (req, res, next) => {
    try {
      // get parameter
      const { id } = req.params;

      // request to database
      const result = await productModel.getDetail(id);

      // data validation
      const check = result.rowCount;

      if (!check) {
        return res.send({
          message: "no product recorded with corresponding id",
        });
      }

      // get old product data
      const product = result.rows[0];

      // remove product
      await productModel.remove(id);

      res.send({
        message: "remove product success",
        product,
      });
    } catch (err) {
      console.log(err.message);
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = productController;
