const mysql = require("mysql2");

const db = mysql.createPool({
   host: "localhost",
   user: "root",
   password: "billie12",
   database: "Login_LexClips"
});

module.exports = db;