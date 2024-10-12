import React from "react";
import useConversation from "../../zustand/useConversation";
import s from "../../../public/b1.jpg";
import { useSocketContext } from "../../Context/SocketContext";
function ConvComp({ convo, lastIdx, emoji }) {
  const { selectedConversation, setselectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === convo._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(convo._id);
  return (
    <>
      <div
        className={`flex  gap-2 items-center hover:bg-sky-500 rounded py-1 p-2 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setselectedConversation(convo)}
      >
        <div className={` ${isOnline ? "online" : ""} avatar `}>
          <div className="w-12 rounded-full">
            <img src={convo.profilePic} alt="" />
          </div>
        </div>
        <div className="flex  justify-between flex-1">
          <p className="font-bold text-gray-200">{convo.fullName}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>
      {!lastIdx && <hr />}
    </>
  );
}

export default ConvComp;
