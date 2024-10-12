import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";
export const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      console.log("currentUser", currentUser);
      const socket = io("http://localhost:3000", {
        query: {
          userId: currentUser.user?._id,
        },
      });
      setSocket(socket);
      //socket().on() is used to listen to the events, can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } /*  else if (socket) {
      socket.close();
      setSocket(null);
    } */
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
