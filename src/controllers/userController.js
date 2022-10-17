import { v4 } from "uuid";
import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validate from "../middleware/validate.middleware.js";
import {
  checkEmail,
  loginUser,
  newUser,

} from "../../utils/queries.js";


// Add a new User
const createUser = async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  // validating reg.body with joi
  await validate.validateSignUP.validateAsync(req.body);

  // checking if a user already has an account
  db.query(checkEmail, [req.body.email], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "An error occurred, please contact the system Admin",
      });
    }

    if (rows.length) {
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
    db.query(
      newUser,
      [
        users.id,
        users.first_name,
        users.last_name,
        users.email,
        users.phone_number,
        users.password,
      ],
      (err, _) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "An error occurred, please contact the system Admin",
          });
        }

        return res.status(201).json({ message: "User created", });
      }
    );
  });
};

// logging in a user
const login = async (req, res) => {
  const { email, password } = req.body;

  // validate with joi
  await validate.validateSignIn.validateAsync(req.body);

  //  checking email and password match
  if (email && password) {
    db.query(loginUser, [email], (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "An error occurred, please contact the system Admin",
        });
      }
      if (!rows.length) {
        return res.status(400).json({
          message: "email address not found.",
        });
      }
      const passMatch = bcrypt.compare(password, rows[0].password);
      if (!passMatch) {
        return res.status(400).json({ message: "incorrect details" });
      }

      // creating a payload
      const payload = {
        id: rows[0].id,
        email: rows[0].email,
      };

      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
      });
    });
  }
};


export default {
  createUser,
  login,
};
