import React, { useEffect, useState } from "react";
import ConvComp from "./ConvComp";
import axios from "axios";
import { getRandomEmoji } from "../../utils/emojis";

function Conversations() {
  const [Conversations, setConversations] = useState("");
  useEffect(() => {
    async function GetConvos() {
      try {
        const res = await axios.get("http://localhost:3000/user/Allusers", {
          withCredentials: true,
        });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    GetConvos();
  }, []);
  console.log("get convo", Conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* {Conversations.map((c) => (
        <ConvComp />
      ))} */}

      {Conversations.map((conv) => (
        <ConvComp
          key={conv.id}
          convo={conv}
          emoji={getRandomEmoji}
          lastIdx={idx === Conversations.length - 1}
        />
      ))}
    </div>
  );
}

export default Conversations;
