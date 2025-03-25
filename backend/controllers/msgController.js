import { Message } from "../models/msg.models.js";

export const createMessage = async (req, res) => {
  const { message, deliveryDate, userId } = req.body;

  try {
    const newMessage = new Message({
      userId,
      message,
      deliveryDate,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to create message" });
  }
};

export const getMessages = async (req, res) => {
  const { userId } = req.query;

  try {
    const messages = await Message.find({ userId });
    const messagesWithLockStatus = messages.map((message) => {
      const messageObj = message.toObject();
      messageObj.isLocked = message.isLocked();
      return messageObj;
    });
    res.status(200).json(messagesWithLockStatus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { message, deliveryDate } = req.body;

  try {
    const existingMessage = await Message.findById(id);
    if (!existingMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (existingMessage.isLocked()) {
      return res.status(403).json({ message: "Message is locked" });
    }

    const selectedDate = new Date(deliveryDate);
    const today = new Date();
    today.setHours(24, 0, 0, 0);

    if (selectedDate <= today) {
      return res.status(400).json({
        message: "Delivery date must be a future date",
      });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { message, deliveryDate },
      { new: true }
    );

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Error updating message" });
  }
};

export const getMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error fetching message" });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.isLocked()) {
      return res.status(403).json({ message: "Message is locked" });
    }

    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
};
