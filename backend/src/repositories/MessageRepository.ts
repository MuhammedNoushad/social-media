import IMessage from "../interfaces/IMessage";
import Conversation from "../models/converstaion.model";
import Message from "../models/message.model";

class MessageRepository {
  // Function for get messages
  async getMessages(userId: string, userToChatId: string) {
    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [userId, userToChatId] },
      })
        .populate({
          path: "messages",
          populate: [
            { path: "sender", select: "-password -role" },
            { path: "receiver", select: "-password -role" },
          ],
        })
        .populate("participants", "-password -role");

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [userId, userToChatId],
          messages: [],
          lastMessage: "Start a conversation",
        });
        conversation = await conversation.populate({
          path: "messages",
          populate: [
            { path: "sender", select: "-password -role" },
            { path: "receiver", select: "-password -role" },
          ],
        });
        conversation = await conversation.populate(
          "participants",
          "-password -role"
        );
      }

      return conversation;
    } catch (error) {
      throw error;
    }
  }

  //   Function for create message
  async createMessage(userId: string, userToChatId: string, message: string) {
    try {
      const newMessage = await Message.create({
        sender: userToChatId,
        receiver: userId,
        message: message,
      });

      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  //   Function for find conversation and add message
  async findConversationAndAddMessage(
    userId: string,
    userToChatId: string,
    message: IMessage
  ) {
    try {
      let conversation = await Conversation.find({
        participants: { $all: [userId, userToChatId] },
      }).populate({
        path: "messages",
        select: "message sender receiver",
      });

      // Check if the conversation is an array or a single document
      if (conversation.length === 0) {
        conversation = await (
          await Conversation.create({
            participants: [userId, userToChatId],
            messages: [message],
            lastMessage: message.message,
          })
        ).populate({
          path: "messages",
          select: "message sender receiver",
        });
      } else {
        conversation = await Conversation.findOneAndUpdate(
          { participants: { $all: [userId, userToChatId] } },
          {
            $push: { messages: message },
            $set: { lastMessage: message.message },
          },
          { upsert: true, new: true }
        ).populate({
          path: "messages",
          select: "message sender receiver",
        });
      }

      console.log(
        conversation,
        "conversation from findConversationAndAddMessage"
      );
      return conversation;
    } catch (error) {
      throw error;
    }
  }

  // Function for fetch conversation for a specific user
  async getConversations(userId: string) {
    try {
      const conversations = await Conversation.find({
        participants: { $in: [userId] },
      }).populate({
        path: "messages",
        select: "message sender receiver",
      });
      return conversations;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageRepository;
