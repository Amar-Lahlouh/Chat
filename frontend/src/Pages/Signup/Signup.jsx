import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
function Signup() {
  const [fullName, setfullName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmpassword] = useState("");
  const [gender, setgender] = useState("");
  // const [Error, setError] = useState("");
  const handleCheckboxChange = (gender) => {
    setgender(gender);
  };

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // if (password != confirmPassword)
    //   return setError("passwords doesn't match!");
    let data = {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    };
    console.log("dTa", data);
    try {
      console.log("byyyee");
      const res = await axios.post("http://localhost:3000/auth/signup", data, {
        withCredentials: true,
      });
      console.log("ene");
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("err", err);
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    // TAILWINDCSS GLASSMORPHISM GENERATOR hyde krmal 23ml hyda lblur
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup <span className="text-blue-500">ChatApp</span>
        </h1>

        <form
          action="

        "
          onSubmit={HandleSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full input input-bordered h-10 mt-9"
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setusername(e.target.value)}
              placeholder="Username"
              className="w-full input input-bordered h-10 mt-9"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className="w-full input input-bordered h-10 mt-9"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setconfirmpassword(e.target.value)}
              placeholder=" Confirm Password"
              className="w-full input input-bordered h-10 mt-9"
            />
          </div>
          <GenderCheckBox
            onCheckbox={handleCheckboxChange}
            selectedGender={gender}
          />
          {/* {Error && <span className="text-red-600">{Error}</span>} */}
          <button className="btn no-animation m-auto flex justify-center mt-8 px-7">
            Signup
          </button>

          <div className="text-center mt-6 text-white ">
            Already have an Account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
