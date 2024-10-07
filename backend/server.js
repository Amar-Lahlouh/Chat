import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import messageRouter from "./routes/message.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log("Server Running on port 3000");
});
mongoose.connect(process.env.MONGO_URL, { dbName: "ChatWeb" }).then(() => {
  console.log("Database connected");
});
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);
