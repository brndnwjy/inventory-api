const productModel = require("../model/product.model");

const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const productController = {
  insert: async (req, res, next) => {
    try {
      // prepare product data
      const id = uuid();
      const { cid, title, description, stock } = req.body;
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
    } catch {
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
    } catch {
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
    } catch {
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = productController;
