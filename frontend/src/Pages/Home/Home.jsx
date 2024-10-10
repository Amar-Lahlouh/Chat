import React, { useContext } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import MessageContainer from "../../Components/MessageContainer/MessageContainer";
import { AuthContext } from "../../Context/AuthContext";

function Home() {
  const { currentUser } = useContext(AuthContext);
  console.log("curr", currentUser?.user?.fullName);
  return (
    <div className="flex justify-center">
      <div className="w-full flex sm:h-[450px] md:h-[550px] p-6 rounded-lg shadow-md bg-gray-400  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <SideBar />
        {/* <p className="text-white">Hiii</p> */}
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
