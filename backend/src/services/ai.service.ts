import { OpenAI } from 'openai';
import { env } from '../config/env';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

/** Returns an OpenAI-compatible client configured from environment variables.
 *  Supports DeepSeek (cloud) and Ollama (local) providers.
 */
function createAiClient(): OpenAI {
  if (env.AI_PROVIDER === 'ollama') {
    return new OpenAI({
      apiKey: 'ollama',
      baseURL: env.AI_BASE_URL || 'http://localhost:11434/v1'
    });
  }

  // Default: DeepSeek (or any OpenAI-compatible cloud provider)
  if (!env.AI_API_KEY) {
    throw new Error(
      'AI_API_KEY is not set. ' +
      'Please add it to your .env file (e.g. AI_API_KEY=sk-...).'
    );
  }

  return new OpenAI({
    apiKey: env.AI_API_KEY,
    baseURL: env.AI_BASE_URL
  });
}

export const aiService = {
  chat: async (data: ChatRequest) => {
    const client = createAiClient();

    const response = await client.chat.completions.create({
      model: env.AI_MODEL,
      messages: [
        {
          role: 'system',
          content:
            '你是一个考研资料平台的智能客服，负责回答用户关于考研资料的问题，' +
            '包括课程内容、价格、购买流程等。请保持专业、友好的语气。'
        },
        ...data.messages
      ]
    });

    return {
      reply:
        response.choices[0]?.message?.content || '抱歉，我无法回答这个问题。'
    };
  }
};
