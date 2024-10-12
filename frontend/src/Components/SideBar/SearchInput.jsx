import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
function SearchInput() {
  const [Search, setSearch] = useState("");
  const [Conversations, setConversations] = useState([]);
  const { setselectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Search) return;

    if (Search.length < 2)
      return toast.error("Search should be at least 2 characters long");

    const conv = Conversations.find((c) =>
      c.fullName.toLowerCase().includes(Search.toLowerCase())
    );

    console.log("conv", conv);

    if (conv) {
      setselectedConversation(conv);
      setSearch("");
    } else {
      toast.error(`No User Found !`);
    }
  };

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
  return (
    <form className="flex justify-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <CiSearch />
      </button>
    </form>
  );
}

export default SearchInput;
