import express from 'express';
import { aiController } from '../controllers/ai.controller';

const router = express.Router();

// 智能客服聊天
router.post('/chat', aiController.chat);

export default router;