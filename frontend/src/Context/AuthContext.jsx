import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (data) => {
    console.log("logindaataaaaa", data);
    const res = await axios.post("http://localhost:3000/auth/login", data, {
      withCredentials: true,
    });
    console.log("afterrrrrrrrrr");
    const user = res.data?.user;
    console.log("user context", user);
    setCurrentUser(user);
    window.location.href = "/home";
  };

  useEffect(() => {
    console.log("Context");
    const refresh = async () => {
      const res = await axios.post(
        "http://localhost:3000/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (!res.data.valid) return console.log("not valid token");
      console.log("twst");
      console.log("-".repeat(50));
      const userRes = await axios.get(`http://localhost:3000/user/me`, {
        withCredentials: true,
      });
      console.log("hi");

      let userData = userRes.data;
      console.log("hi");
      console.log("userdata", userData);
      setCurrentUser({ user: userData });
    };
    currentUser || refresh();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    window.location.href = "/login";
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
