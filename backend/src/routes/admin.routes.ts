import express from "express";
import { blockUser, getUsers } from "../controllers/admin.controllers";
import verifyToken from "../middleware/verifyToken";

const adminRoute = express.Router();

adminRoute.get("/users", verifyToken, getUsers);
adminRoute.put("/block-user/:userId", verifyToken, blockUser);

export default adminRoute;
