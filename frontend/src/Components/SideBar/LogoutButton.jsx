import React, { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../Context/AuthContext";
// import { BiLogOut } from "react-icons/bi";
function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const handleSubmit = async () => {
    try {
      await logout();
    } catch (err) {}
  };
  return (
    <div className="mt-auto">
      {/* <BiLogOut />
      <BiLogOut /> */}
      <CiLogout
        className="text-white w-6 cursor-pointer h-6  "
        onClick={handleSubmit}
      />
    </div>
  );
}

export default LogoutButton;
