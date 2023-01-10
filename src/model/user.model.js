const pool = require("../config/db");

const userModel = {
  emailCheck: (email) => {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  },

  register: (data) => {
    return pool.query(
      `
        INSERT INTO users (user_id, fullname, email, password, created_at)
        VALUES ($1, $2, $3, $4, $5)
        `,
      [data.id, data.fullname, data.email, data.password, data.date]
    );
  },
};

module.exports = userModel;
