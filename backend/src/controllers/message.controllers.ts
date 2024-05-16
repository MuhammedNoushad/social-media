import { Request, Response } from "express";
import MessageRepository from "../repositories/MessageRepository";

const messageRepository = new MessageRepository();

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { userId, userToChatId } = req.params;

    const conversation = await messageRepository.getMessages(
      userId,
      userToChatId
    );

    if (!conversation) {
      return res.status(400).json({ error: "Failed to fetch messages" });
    }

    const messages = conversation?.messages;

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for setting message
export const setMessage = async (req: Request, res: Response) => {
  try {
    const { userId, userToChatId } = req.params;
    const { message } = req.body;

    const newMessage = await messageRepository.createMessage(
      userId,
      userToChatId,
      message
    );

    console.log(newMessage, "newMessage");

    const conversation = await messageRepository.findConversationAndAddMessage(
      userId,
      userToChatId,
      newMessage
    );

    if (!conversation) {
      return res.status(400).json({ error: "Failed to fetch messages" });
    }

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
