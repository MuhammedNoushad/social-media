import IMessage from "../interfaces/IMessage";
import Conversation from "../models/converstaion.model";
import Message from "../models/message.model";

class MessageRepository {
  // Function for get messages
  async getMessages(userId: string, userToChatId: string) {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [userId, userToChatId] },
      });
      return conversation;
    } catch (error) {
      throw error;
    }
  }

  //   Function for create message
  async createMessage(userId: string, userToChatId: string, message: string) {
    try {
      const newMessage = await Message.create({
        sender: userId,
        receiver: userToChatId,
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
          })
        ).populate({
          path: "messages",
          select: "message sender receiver",
        });
      } else {
        conversation = await Conversation.findOneAndUpdate(
          { participants: { $all: [userId, userToChatId] } },
          { $push: { messages: message } },
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
}

export default MessageRepository;
