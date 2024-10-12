import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import messageRouter from "./routes/message.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { app, server } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT;
app.use(express.json());
server.listen(port, () => {
  console.log("Server Running on port 3000");
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL, { dbName: "ChatWeb" }).then(() => {
  console.log("Database connected");
});
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);
