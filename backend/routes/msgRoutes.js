import express from "express";
import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  getMessageById,
} from "../controllers/msgController.js";

const msgRouter = express.Router();

msgRouter.post("/", createMessage);
msgRouter.get("/", getMessages);
msgRouter.get("/:id", getMessageById); 
msgRouter.put("/:id", updateMessage); 
msgRouter.delete("/:id", deleteMessage);

export default msgRouter;