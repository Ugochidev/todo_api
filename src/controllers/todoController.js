import { v4 } from "uuid";
import db from "../database/db.js";


const createTodo = (req, res, next) => {
	try {
		const {task, due_date} = req.body;

		const newTodo = {
			id: v4(),
			user_id: req.userId,
			task: task,
			due_date: due_date,
			created_at: new Date(),
			updated_at: new Date()
		}

		db.query("INSERT INTO todos (id, user_id, task, due_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)", [newTodo.id, newTodo.user_id, newTodo.task, newTodo.due_date, newTodo.created_at, newTodo.updated_at], (err, result) => {
			if (err) {
				return res.status(500).json({
					message:
						"An error occurred, please contact the system Admin",
				});
			}
			return res.status(201).json({message: "Todo Created Successfully"})
		})
	} catch (err) {
		next(err)
	}
}

const getTodos = (req, res, next) => {
	try {
		db.query("SELECT * FROM todos WHERE user_id = ?", [req.userId], (err, result) => {
		if (err) {
			return res.status(500).json({
				message: "An error occurred, please contact the system Admin",
			});
		}
		return res.status(200).json(result);	
		})


	} catch (err) {
		next(err)
	}
}

const getTodo = (req, res, next) => {
	try {
		const {id} = req.params;

		db.query("SELECT * FROM todos WHERE id = ?", [id], (err, result) => {
			if (err) {
				return res.status(500).json({
					message:
						"An error occurred, please contact the system Admin",
				});
			}
			if (!result.length) {
				return res.status(404).json({
					message: "Todo not found",
				});
			}
			if (result[0].user_id !== req.userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}
			return res.status(200).json(result);
		})
	} catch (err) {
		next(err)
	}
}

const updateTodo = (req, res, next) => {
	const {task, status, due_date} = req.body;
	const { id } = req.params;
	const updated_at = new Date();
	db.query("SELECT * FROM todos WHERE id = ?", [id], (err, result) => {
		if (err) {
			return res.status(500).json({
				message: "An error occurred, please contact the system Admin",
			});
		}
		if (!result.length) {
			return res.status(404).json({
				message: "Todo not found",
			});
		}
		if (result[0].user_id !== req.userId) {
			return res.status(403).json({ message: "Unauthorized" });
		}
		if (task) {
			db.query("UPDATE todos SET task = ?, updated_at = ? WHERE id = ?", [task, updated_at, id] )
		}
		if (status) {
			db.query("UPDATE todos SET status = ?, updated_at = ? WHERE id = ?", [
				status,
				updated_at,
				id,
			]);
		}
		if (due_date) {
			db.query("UPDATE todos SET due_date = ?, updated_at = ? WHERE id = ?", [
				due_date,
				updated_at,
				id,
			]);
		}
		return res.status(200).json({message: "Todo Updated Successfully"})
	});
}

const deleteTodo = (req, res, next) => {
	try {
		const {id} = req.params;
		db.query("SELECT * FROM todos WHERE id = ?", [id], (err, result) => {
			if (err) {
				return res.status(500).json({
					message:
						"An error occurred, please contact the system Admin",
				});
			}
			if (!result.length) {
				return res.status(404).json({
					message: "Todo not found",
				});
			}
			if (result[0].user_id !== req.userId) {
				return res.status(403).json({ message: "Unauthorized" });
			}
			db.query("DELETE FROM todos WHERE id = ?", [id])
			return res.status(200).json({message: "Todo Successfully Deleted"});
		});

	} catch (err) {
		next(err);
	}
}


export default {createTodo, getTodos, getTodo, updateTodo, deleteTodo}