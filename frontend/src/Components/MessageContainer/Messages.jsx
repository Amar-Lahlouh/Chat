import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import axios from "axios";
import Skeleton from "../../MessageSkeleton/Skeleton";
import ListenMessages from "../hook/ListenMessages";

function Messages() {
  const [Loading, setLoading] = useState("");
  const lastMessageRef = useRef();

  const { messages, setMessages, selectedConversation } = useConversation();
  //mshen bs eft7by5dne 3la 25er message
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  useEffect(() => {
    async function GetMessages() {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversation?._id) GetMessages();
  }, [selectedConversation?._id, setMessages]);
  // console.log("message", messages);
  // console.log(messages.length);
  ListenMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!Loading &&
        messages.length > 0 &&
        messages.map((m) => (
          <div key={m._id} ref={lastMessageRef}>
            <Message m={m} />
          </div>
        ))}
      {Loading && [...Array(3)].map((_, idx) => <Skeleton key={idx} />)}

      {!Loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start a conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
