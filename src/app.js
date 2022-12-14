import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();
const port = process.env.PORT || 6060;

app.use(cors())
app.use(express.json());

app.get("/", (_, res) => {
	res.json({ message: "TODO API is Running!!!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`App listening on port: http://localhost:${port}`);
});
