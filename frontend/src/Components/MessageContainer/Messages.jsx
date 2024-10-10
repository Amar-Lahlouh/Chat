import React, { useEffect } from "react";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import axios from "axios";

function Messages() {
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    async function GetMessages() {
      try {
        const res = await axios.get(
          `http://localhost:3000/message/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (selectedConversation?._id) GetMessages();
  }, [selectedConversation?._id, setMessages]);
  console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message /> <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;
