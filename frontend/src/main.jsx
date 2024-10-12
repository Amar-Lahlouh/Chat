import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { SocketProvider } from "./Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    <AuthContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
