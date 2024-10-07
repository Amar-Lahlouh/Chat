import React from "react";
import { CiLogout } from "react-icons/ci";
// import { BiLogOut } from "react-icons/bi";
function LogoutButton() {
  return (
    <div className="mt-auto">
      {/* <BiLogOut />
      <BiLogOut /> */}
      <CiLogout className="text-white w-6 cursor-pointer h-6  " />
    </div>
  );
}

export default LogoutButton;
