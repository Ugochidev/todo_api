const createTodoQuery =
	"INSERT INTO todos (id, user_id, title, description, due_date, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const findTodoQuery = "SELECT * FROM todos WHERE user_id = $1";
const deleteTodoQuery = "DELETE FROM todos WHERE id = $1";

export {createTodoQuery, findTodoQuery, deleteTodoQuery}