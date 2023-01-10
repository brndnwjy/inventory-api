const productModel = require("../model/product.model");

const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const productController = {
  insert: async (req, res, next) => {
    try {
      // prepare category data
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

      // insert new category
      await productModel.insert(data);

      res.json({
        message: "insert product success",
        product: data,
      });
    } catch {
      next(createError(500, "internal server error"));
    }
  },
};

module.exports = productController;
