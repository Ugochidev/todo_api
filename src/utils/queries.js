const checkEmail = "SELECT email FROM users WHERE email = ?";
const newUser =
	"INSERT INTO users ( id, first_name, last_name, email, phone_number, password) VALUES ( ?, ?, ?, ?, ?, ?)";
const loginUser =
	"SELECT id, email, password, is_verified FROM users WHERE email =?";
export {
	checkEmail,
	newUser,
	loginUser,
};
