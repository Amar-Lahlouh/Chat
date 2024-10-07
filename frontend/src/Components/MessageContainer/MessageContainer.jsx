import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessagesSquare } from "react-icons/lu";
import noChatSelected from "./noChatSelected";
function MessageContainer() {
  const noChatSelecte = true;

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelecte ? (
        <noChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">Jon Doe</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;
