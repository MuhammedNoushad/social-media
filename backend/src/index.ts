import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "http";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes";
import connectToMongoDB from "./db/connectToMongoDB";
import userRoute from "./routes/user.routes";
import adminRoute from "./routes/admin.routes";
import postRoute from "./routes/post.routes";
import connectionRoute from "./routes/connection.routes";
import messageRoute from "./routes/message.routes";
import { app, server } from "./socket/socket";
import storyRoute from "./routes/story.routes";

dotenv.config();

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/posts", postRoute);
app.use("/api/connection", connectionRoute);
app.use("/api/messages", messageRoute);
app.use("/api/story", storyRoute);

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
