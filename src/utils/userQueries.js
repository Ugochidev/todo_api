const findEmailQuery = "SELECT id, email, password FROM users WHERE email = $1";
const newUserQuery =
	"INSERT INTO users ( id, first_name, last_name, email, phone_number, password) VALUES ( $1, $2, $3, $4, $5, $6)";

export { findEmailQuery, newUserQuery };
