import React from "react";

function GenderCheckBox({ onCheckbox, selectedGender }) {
  return (
    <div className="flex text-white pt-5">
      <div className="form-control">
        <label htmlFor="" className="label gap-2 cursor-pointer">
          <span className="label-text text-white">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-400"
            checked={selectedGender === "male"}
            onChange={() => onCheckbox("male")}
          />
        </label>
      </div>
      <div className="form-control px-2">
        <label htmlFor="" className="label gap-2 cursor-pointer">
          <span className="label-text text-white">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-400"
            checked={selectedGender === "female"}
            onChange={() => onCheckbox("female")}
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckBox;
