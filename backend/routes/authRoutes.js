import express from "express";
import { signup, login } from "../controllers/authController.js";

// It is used for routing
const authRouter = express.Router();

// Post is used because the data is being sent to the server
authRouter.post("/signup", signup);
authRouter.post("/login", login);

export default authRouter;
