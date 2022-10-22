import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateSignIn, validateSignUP } from "../middleware/validate.middleware.js";
import { checkEmail, newUser } from "../utils/userQueries.js";
import pool from "../database/db.js";

// Add a new User
const createUser = async (req, res, next) => {
	try {
		const { first_name, last_name, email, phone_number, password } =
			req.body;
		const hashPassword = await bcrypt.hash(password, 10);

		// validating reg.body with joi
		const validate = await validateSignUP.validateAsync(req.body);
		console.log(validate);
		// checking if a user already has an account
		const verifyEmail = await pool.query(checkEmail, [email]);
		if (verifyEmail.rows[0]) {
			return res.status(400).json({
				message: "User already exist",
			});
		}
		// creating a new user
		const users = {
			id: v4(),
			first_name: first_name,
			last_name: last_name,
			email: email,
			phone_number: phone_number,
			password: hashPassword,
		};

		const createUser = await pool.query(newUser, [
			users.id,
			users.first_name,
			users.last_name,
			users.email,
			users.phone_number,
			users.password,
		]);
		return res.status(201).json({ message: "User created" });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

// logging in a user
const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// validate with joi
		await validateSignIn.validateAsync(req.body);

		//  checking email and password match
		if (email && password) {
			const verifyEmail = await pool.query(checkEmail, [email]);

			if (!verifyEmail.rows.length) {
				return res.status(400).json({
					message: "email address not found.",
				});
			}
			const passMatch = bcrypt.compare(
				password,
				verifyEmail.rows[0].password
			);
			if (!passMatch) {
				return res.status(400).json({ message: "incorrect details" });
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
		}
	} catch (err) {
		next(err);
	}
};

export default {
	createUser,
	loginUser,
};
