const pool = require("../config/db");

const productModel = {
  insert: (data) => {
    return pool.query(
      `
        INSERT INTO product (product_id, category_id, product_title, 
            description, stock, photo, created_at)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        `,
      [
        data.id,
        data.cid,
        data.title,
        data.description,
        data.stock,
        data.photo,
        data.date,
      ]
    );
  },

  getAll: () => {
    return pool.query("SELECT * FROM product");
  },

  getDetail: (id) => {
    return pool.query(`SELECT * FROM product WHERE product_id = $1`, [id]);
  },
};

module.exports = productModel;
