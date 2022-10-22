import { v4 } from "uuid";
import pool from "../database/db.js";
import AppException from "../utils/appException.js";
import {
	createTodoQuery,
	deleteTodoQuery,
	findTodoQuery,
} from "../utils/todoQueries.js";

/*---- Create A New Todo -----*/
const createTodo = async (req, res, next) => {
	try {
		const { title, description, due_date } = req.body;

		const newTodo = {
			id: v4(),
			user_id: req.userId,
			title: title,
			description: description,
			due_date: due_date,
			created_at: new Date(),
			updated_at: new Date(),
		};

		await pool.query(createTodoQuery, [
			newTodo.id,
			newTodo.user_id,
			newTodo.title,
			newTodo.description,
			newTodo.due_date,
			newTodo.created_at,
			newTodo.updated_at,
		]);

		return res.status(201).json({
			message: "Todo Created Successfully",
		});
	} catch (err) {
		next(err);
	}
};

/*---- Fetch All Todos Created By The User -----*/
const getTodos = async (req, res, next) => {
	try {
		const findTodos = await pool.query(findTodoQuery, [req.userId]);

		return res.status(200).json(findTodos.rows);
	} catch (err) {
		next(err);
	}
};

/*---- Fetch User's Todo By Id -----*/
const getTodo = async (req, res, next) => {
	try {
		const { id } = req.params;

		const findTodo = await pool.query(findTodoQuery, [id]);
		if (!findTodo.rowCount) {
			throw new AppException(404, "Todo Not Found")
		}
		if (findTodo.rows[0].user_id !== req.userId) {
			throw new AppException(403, "Unauthorized")
		}
		return res.status(200).json(findTodo);
	} catch (err) {
		next(err);
	}
};

/*---- Update User's Todo -----*/
const updateTodo = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated_at = new Date();
		const findTodo = await pool.query(findTodoQuery, [id]);
		if (!findTodo.rows.length) {
			throw new AppException(404, "Todo Not Found")
		}
		if (findTodo.rows[0].user_id !== req.userId) {
			throw new AppException(403, "Unauthorized")
		}

		let updateTodos = "UPDATE todos SET updated_at = $1, ";
		const updateKeys = Object.keys(req.body);
		let values = [updated_at];
		let param = 2;

		updateKeys.forEach((key, index) => {
			const value = req.body[key];
			updateTodos += `${key} = $` + param;
			param++;
			if (index < updateKeys.length - 1) {
				updateTodos += ", ";
			}
			values.push(value);
		});
		values.push(id);
		let lastParam = updateKeys.length + 2;
		updateTodos += " WHERE id = $" + lastParam;
		console.log(updateTodos, values);
		pool.query(updateTodos, values);

		return res.status(200).json({ message: "Todo Updated Successfully" });
	} catch (err) {
		next(err);
	}
};

/*---- Delete User's Todo -----*/
const deleteTodo = async (req, res, next) => {
	try {
		const { id } = req.params;
		const findTodo = await pool.query(findTodoQuery, [id]);
		if (!findTodo.rows.length) {
			throw new AppException(404, "Todo Not Found")
		}
		if (findTodo.rows[0].user_id !== req.userId) {
			throw new AppException(403, "Unauthorized")
		}
		pool.query(deleteTodoQuery, [id]);

		return res.status(410).json({
			message: "Todo Successfully Deleted",
		});
	} catch (err) {
		next(err);
	}
};

export default { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
