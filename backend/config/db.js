import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path: "./.env",
});

const databaseName = "futurous";
const mongoDbUri = process.env.MONGO_DB_URI;

export const dbConnection = async () => {
  try {
    if (!mongoDbUri) {
      throw new Error("MongoDB URI is not found in .env file");
    }
    const connectionInstance = await mongoose.connect(
      `${mongoDbUri}/${databaseName}`
    );
    console.log("Database Connected At: ", connectionInstance.connection.host);
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
