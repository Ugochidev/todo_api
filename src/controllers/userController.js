import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	validateSignIn,
	validateSignUP,
} from "../middleware/validate.middleware.js";
import { findEmailQuery, newUserQuery } from "../utils/userQueries.js";
import pool from "../database/db.js";
import AppException from "../utils/appException.js";

// Add a new User
const createUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const hashPassword = await bcrypt.hash(password, 10);

		// validating reg.body with joi
		const validate = await validateSignUP.validateAsync(req.body);

		// checking if a user already has an account
		const verifyEmail = await pool.query(findEmailQuery, [email]);
		if (verifyEmail.rows[0]) {
			throw new AppException(404, "User Already Exists");
		}
		// creating a new user
		const users = {
			id: v4(),
			name: name,
			email: email,
			password: hashPassword,
		};

		const createUser = await pool.query(newUserQuery, [
			users.id,
			users.name,
			users.email,
			users.password,
		]);
		return res.status(201).json({ message: "User created" });
	} catch (err) {
		next(err);
	}
};

// logging in a user
const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// validate with joi
		const validate = await validateSignIn.validateAsync(req.body);

		//  checking email and password match
			const verifyEmail = await pool.query(findEmailQuery, [email]);

			if (!verifyEmail.rows.length) {
				throw new AppException(404, "Incorrect Details");
			}
			const passMatch = await bcrypt.compare(
				password,
				verifyEmail.rows[0].password
			);
			if (!passMatch) {
				throw new AppException(404, "Incorrect Details");
			}

			// creating a payload
			const payload = {
				id: verifyEmail.rows[0].id,
				email: verifyEmail.rows[0].email,
			};

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "1h",
			});
			return res.status(200).json({
				message: "User logged in successfully",
				token: token,
			});
	} catch (err) {
		next(err);
	}
};

export default {
	createUser,
	loginUser,
};
