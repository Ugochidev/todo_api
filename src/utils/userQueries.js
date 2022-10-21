const checkEmail = "SELECT email FROM users WHERE email = $1";
const newUser =
	"INSERT INTO users ( id, first_name, last_name, email, phone_number, password) VALUES ( $1, $2, $3, $4, $5, $6)";
const loginUser =
	"SELECT id, email, password FROM users WHERE email =$1";
export {
	checkEmail,
	newUser,
	loginUser,
};
