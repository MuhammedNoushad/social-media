import { Request, Response } from "express";
import MessageRepository from "../repositories/MessageRepository";
import { getRecieverSocketId, io } from "../socket/socket";

const messageRepository = new MessageRepository();

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { userId, userToChatId } = req.params;

    const conversations = await messageRepository.getMessages(
      userId,
      userToChatId
    );

    if (!conversations) {
      return res.status(400).json({ error: "Failed to fetch messages" });
    }

    return res.status(200).json({ success: true, conversations });
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
    const conversation = await messageRepository.findConversationAndAddMessage(
      userId,
      userToChatId,
      newMessage
    );

    if (!conversation) {
      return res.status(400).json({ error: "Failed to fetch messages" });
    }

    // socket connection for sending message
    const recieverSocketId = getRecieverSocketId(userToChatId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newConversation", conversation);
    }

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch all conversation of a user
export const fetchConverstions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const conversations = await messageRepository.getConversations(userId);

    if (!conversations) {
      return res.status(400).json({ error: "Failed to fetch messages" });
    }

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
