import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import controller from "../controllers/todoController.js"
const router = express.Router();

router.post("/", authMiddleware.authenticate, controller.createTodo);
router.get("/", authMiddleware.authenticate, controller.getTodos);
router.get("/:id", authMiddleware.authenticate, controller.getTodo);
router.patch("/:id", authMiddleware.authenticate, controller.updateTodo);
router.delete("/:id", authMiddleware.authenticate, controller.deleteTodo);

export default router;
