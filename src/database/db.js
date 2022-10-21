// import mysql from "mysql";
// import dotenv from "dotenv";
// dotenv.config();

// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   port: process.env.DBPORT,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
// });

// connection.connect(function (err) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }

//   console.log("Connected to MySQL server.");
// });

// export default connection;

import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "crud_app",
	password: "12345678",
	port: "5432",
});

pool.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to POSTGRESQL server.");
});

export default pool;
