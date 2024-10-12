import React, { useEffect } from "react";
import { useSocketContext } from "../../Context/SocketContext";
import useConversation from "../../zustand/useConversation";
import notificationSound from "../../assets/sounds/notification.mp3";
function ListenMessages() {
  const { socket } = useSocketContext();

  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("newMessage");
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("new Message");
  }, [socket, setMessages, messages]);
}

export default ListenMessages;
