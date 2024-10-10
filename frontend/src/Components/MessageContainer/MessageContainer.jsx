import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessagesSquare } from "react-icons/lu";
import NoChatSelected from "./noChatSelected";
import useConversation from "../../zustand/useConversation";
function MessageContainer() {
  // const noChatSelecte = true;

  const { selectedConversation, setselectedConversation } = useConversation();
  useEffect(() => {
    // krmal bs 23ml logout w erj3 23mlm login m ydal 3la al selected chat yali ken mna2eha
    return () => setselectedConversation(null);
  }, [setselectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;
