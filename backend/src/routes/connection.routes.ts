import express from "express";
import { fetchAllConnections, follow, unfollow } from "../controllers/connection.controller";
const connectionRoute = express.Router();

connectionRoute.get('/:userId', fetchAllConnections);
connectionRoute.post("/follow", follow);
connectionRoute.post("/unfollow", unfollow);

export default connectionRoute;
