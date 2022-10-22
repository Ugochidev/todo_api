import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
	user: process.env.User,
	host: process.env.Host,
	database: process.env.Database,
	password: process.env.Password,
	port: process.env.Port,
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to POSTGRESQL server.");
});

export default pool;
