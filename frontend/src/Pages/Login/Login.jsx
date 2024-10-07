import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const { login, currentUser } = useContext(AuthContext);
  let data = {
    Email,
    Password,
  };
  async function handlesubmit() {
    try {
      console.log(data, "data");
      await login(data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }
  useEffect(() => {
    console.log("currentUser updated:", currentUser);
  }, [currentUser]);
  return (
    // TAILWINDCSS GLASSMORPHISM GENERATOR hyde krmal 23ml hyda lblur
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">ChatApp</span>
        </h1>

        <form
          action="
        "
          onSubmit={handlesubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input input-bordered h-10 mt-9"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full input input-bordered h-10 mt-9"
            />
          </div>

          <button className="btn no-animation m-auto flex justify-center mt-8 px-7">
            Login
          </button>
          <div className="text-center mt-6 text-white ">
            Don't you have an Account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
