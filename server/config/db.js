const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect();
db.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err}`);
    return;
  }

  console.log('mysql connected');
});

module.exports = db;
