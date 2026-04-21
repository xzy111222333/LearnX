import { OpenAI } from 'openai';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

export const aiService = {
  chat: async (data: ChatRequest) => {
    const client = new OpenAI({
      apiKey: 'ollama',
      baseURL: 'http://localhost:11434/v1'
    });

    const response = await client.chat.completions.create({
      model: 'qwen3:8b',
      messages: [
        {
          role: 'system',
          content: '你是一个考研资料平台的智能客服，负责回答用户关于考研资料的问题，包括课程内容、价格、购买流程等。请保持专业、友好的语气。'
        },
        ...data.messages
      ]
    });

    return {
      reply: response.choices[0]?.message?.content || '抱歉，我无法回答这个问题。'
    };
  }
};