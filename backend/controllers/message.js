import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("message", message);
    const { id: recieverId } = req.params; //reciever id
    const senderId = req.user.userid; //sender id
    console.log("reciever id", recieverId);
    console.log("senderid", senderId);
    // Get Conversation

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      // Create new conversation
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    //create message in the Message table
    const newMessage = new Message({ senderId, recieverId, message });
    console.log("new messafe", newMessage);
    // Bas i did create a message i add it to the conversation
    if (newMessage) conversation.message.push(newMessage._id);

    // SOCKET IO FUNCTIONALITY

    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.userid;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.message;
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
