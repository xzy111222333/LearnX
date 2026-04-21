import express from 'express';
import { aiController } from '../controllers/ai.controller';

const router = express.Router();

// 智能客服聊天
router.post('/chat', aiController.chat);

// AI 生成资料描述
router.post('/generate-description', aiController.generateDescription);

export default router;