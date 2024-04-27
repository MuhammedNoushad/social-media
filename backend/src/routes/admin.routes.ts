import express from 'express';
import { blockUser, getUsers } from '../controllers/admin.controllers';

const adminRoute = express.Router();

adminRoute.get('/users',getUsers)
adminRoute.put('/block-user/:userId',blockUser)

export default adminRoute