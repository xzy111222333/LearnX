import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { aiService } from '../services/ai.service';
import { success, error as apiError } from '../utils/response';

export const aiController = {
  chat: [
    // 验证请求数据
    body('messages').isArray().withMessage('消息必须是数组'),
    body('messages.*.role').isIn(['user', 'assistant', 'system']).withMessage('消息角色必须是user、assistant或system'),
    body('messages.*.content').notEmpty().withMessage('消息内容不能为空'),
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // 检查验证错误
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(apiError(errors.array().map(e => e.msg).join('; ')));
        }

        const { messages } = req.body;
        const result = await aiService.chat({ messages });
        
        res.status(200).json(success(result));
      } catch (error) {
        next(error);
      }
    }
  ],

  generateDescription: [
    // 验证请求数据
    body('title').notEmpty().withMessage('资料标题不能为空'),
    body('category').notEmpty().withMessage('资料分类不能为空'),
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // 检查验证错误
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(apiError(errors.array().map(e => e.msg).join('; ')));
        }

        const { title, category } = req.body;
        const result = await aiService.generateDescription({ title, category });
        
        res.status(200).json(success(result));
      } catch (error) {
        next(error);
      }
    }
  ]
};