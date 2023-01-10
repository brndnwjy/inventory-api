const pool = require("../config/db");

const categoryModel = {
  insert: (data) => {
    return pool.query(
      `
        INSERT INTO category (category_id, category_title, created_at)
        VALUES($1, $2, $3)
        `,
      [data.id, data.title, data.date]
    );
  },

  getAll: () => {
    return pool.query("SELECT * FROM category");
  },

  getDetail: (id) => {
    return pool.query(`SELECT * FROM category WHERE category_id = $1`, [id]);
  },

  update: (data) => {
    return pool.query(
      `
    UPDATE category SET
    category_title = COALESCE($1, category_title),
    updated_at = COALESCE($2, updated_at)
    WHERE category_id = $3
    `,
      [data.title, data.date, data.id]
    );
  },
};

module.exports = categoryModel;
