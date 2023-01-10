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
};

module.exports = categoryModel;
