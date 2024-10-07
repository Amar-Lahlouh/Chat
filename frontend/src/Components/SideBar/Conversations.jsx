import React from "react";
import ConvComp from "./ConvComp";

function Conversations() {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <ConvComp />
      <ConvComp />
      <ConvComp />
      <ConvComp />
      <ConvComp />
      <ConvComp />
      <ConvComp />
      <ConvComp /> <ConvComp />
    </div>
  );
}

export default Conversations;
