import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useConversation from "../../zustand/useConversation";
function Message({ m }) {
  const { currentUser } = useContext(AuthContext);
  const { selectedConversation } = useConversation();

  const forMe = m.senderId === currentUser.user?._id;
  console.log(currentUser._id, "curr");
  console.log("fromMe", forMe);
  const chatclassName = forMe ? "chat-end" : "chat-start";
  console.log("chatlass name", chatclassName);
  const profilePic = forMe
    ? currentUser.user?.profilePic
    : selectedConversation?.profilePic;

  const bubbleBgColor = forMe ? "bg-blue-500" : "";

  const shakeClass = m.shouldShake ? "shake" : "";
  return (
    <div>
      <div className={`chat ${chatclassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div
          className={` ${bubbleBgColor} ${shakeClass} chat-bubble pb-2 rounded-md `}
        >
          {m.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-400">
          {new Date(m.createdAt).getHours()}:
          {new Date(m.createdAt).getMinutes().toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default Message;
