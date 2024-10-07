import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  return (
    <form className="flex justify-center gap-2">
      <input
        type="text"
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
