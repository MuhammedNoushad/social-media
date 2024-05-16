import express from 'express';
import { getMessage, setMessage } from '../controllers/message.controllers';

const messageRoute = express.Router();

messageRoute.get('/:userId/:userToChatId',getMessage);
messageRoute.post('/:userId/:userToChatId',setMessage)

export default messageRoute