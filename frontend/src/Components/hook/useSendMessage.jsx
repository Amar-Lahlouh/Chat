import React from "react";
import useConversation from "../../zustand/useConversation";

function useSendMessage() {
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    try {
      console.log("start now");
      const res = await axios.get(
        `http://localhost:3000/message/send/${selectedConversation._id}`,
        message,
        {
          withCredentials: true,
        }
      );

      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };
  return { sendMessage };
}

export default useSendMessage;
