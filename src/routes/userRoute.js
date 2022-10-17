import express from "express";
const router = express.Router();
import controllers from "../controllers/userController.js";

router.post("/", controllers.createUser);
router.post("/login", controllers.login);

export default router;
