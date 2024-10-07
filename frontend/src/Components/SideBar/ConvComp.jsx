import React from "react";
import s from "../../../public/b1.jpg";
function ConvComp() {
  return (
    <>
      <div className="flex  gap-2 items-center hover:bg-sky-500 rounded py-1 p-2 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={s} alt="" />
          </div>
        </div>
        <div className="flex  justify-between flex-1">
          <p className="font-bold text-gray-200">John Doe</p>
          <span className="text-xl">🌸</span>
        </div>
      </div>
      <hr />
    </>
  );
}

export default ConvComp;
