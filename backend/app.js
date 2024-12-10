import express from "express";
import { userRouter } from "./routes/users.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use("/api/v1/users", userRouter);

export { app };