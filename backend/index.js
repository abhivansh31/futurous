import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import msgRouter from "./routes/msgRoutes.js";
const app = express();

dotenv.config({
  path: "./.env",
});

// Enable pre-flight across-the-board
app.options("*", cors());

// CORS is used to handle cross origin requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// This is used to decode the incoming request with JSON messages.
app.use(express.json());

dbConnection();

app.use("/api/auth", authRouter);
app.use("/api/messages", msgRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the futurous backend server!");
});

app.listen(process.env.FRONTEND_URL, () => {
  console.log("Server is running");
});
