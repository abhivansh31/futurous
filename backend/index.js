import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import msgRouter from "./routes/msgRoutes.js";
const app = express();

// CORS is used to handle cross origin requests
app.use(cors(
    {
        origin: "https://futurous-8x3n.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

// This is used to decode the incoming request with JSON messages.
app.use(express.json());

dbConnection();

app.use("/api/auth", authRouter);
app.use("/api/messages", msgRouter);

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

app.listen("/"), () => {
  console.log("Welcome to the futurous backend server!");
};
