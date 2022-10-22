const findEmailQuery = "SELECT id, email, password FROM users WHERE email = $1";
const newUserQuery =
	"INSERT INTO users ( id, name, email, password) VALUES ( $1, $2, $3, $4)";

export { findEmailQuery, newUserQuery };
