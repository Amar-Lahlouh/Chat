import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("message", message);
    const { id: recieverId } = req.params; //reciever id
    const senderId = req.user?.userid; //sender id
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
    console.log("new message", newMessage);
    // Bas i did create a message i add it to the conversation
    if (newMessage) conversation.message.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY
    // use to send events to specific client
    const recieverSocketId = getRecieverSocketId(recieverId);
    console.log("recieverSocketId", recieverSocketId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

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
