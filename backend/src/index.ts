import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { Server } from "http";
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.routes'
import connectToMongoDB from "./db/connectToMongoDB";
import userRoute from "./routes/user.routes";
import adminRoute from "./routes/admin.routes";
import postRoute from "./routes/post.routes";


dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use('/api/posts',postRoute)

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    const server: Server = app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
