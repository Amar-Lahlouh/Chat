import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import SendMessage from "../hook/useSendMessage.jsx";
import useConversation from "../../zustand/useConversation.js";
import axios from "axios";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { messages, setMessages, selectedConversation } = useConversation();
  console.log("slect conv", selectedConversation._id);
  async function handleSubmit(e) {
    console.log("start");

    e.preventDefault();
    if (!message) return;
    try {
      console.log("start now");
      const res = await axios.post(
        `http://localhost:3000/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }

    setMessage("");
  }
  console.log("messs", message);
  return (
    <form className="px-4 my-3 text-black" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className=" border text-sm rounded-lg block w-full p-2.5 b-gray-700 border-gray-600 "
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex  items-center pe-3"
        >
          <IoMdSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
