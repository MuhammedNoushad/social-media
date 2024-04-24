import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { Server } from "http";

import authRoute from './routes/auth.routes'
import connectToMongoDB from "./db/connectToMongoDB";


dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);

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
