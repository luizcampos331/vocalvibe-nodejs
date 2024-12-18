import { z } from 'zod';
import { EnvProps } from '../env-props';

class ZodEnv {
  public validateEnv(envs: NodeJS.ProcessEnv): EnvProps {
    const envSchema = z.object({
      // Env
      NODE_ENV: z
        .enum(['test', 'local', 'development', 'staging', 'production'])
        .default('development'),

      // Application
      APP_WEB_URL: z.string(),
      HTTP_IMPLEMENTATION: z.enum(['express']),
      HTTP_PORT: z.coerce.number().default(3333),
      DOMAIN: z.string(),
      REQUEST_BODY_LIMIT: z.string(),

      // Database
      DATABASE_IMPLEMENTATION: z.enum(['postgreSQL']),
      DATABASE_URL: z.string(),
      DATABASE_LOG: z.coerce.boolean().default(false),

      // Storage
      STORAGE_IMPLEMENTATION: z.enum(['disk']),

      // LLM
      LLM_IMPLEMENTATION: z.enum(['openAi']),
      OPENAI_API_KEY: z.string(),
      OPENAI_MODEL: z.string(),
      OPENAI_TEMPERATURE: z.coerce.number(),
      OPENAI_MAX_TOKENS: z.coerce.number(),

      // Events
      SEND_QUESTION_TO_USER_EVENT: z.string(),

      // Websocket
      WEBSOCKET_IMPLEMENTATION: z.enum(['socketIo']),
      CONVERSATION_ROOM: z.string(),
    });

    const _env = envSchema.safeParse(envs);

    if (_env.success === false) {
      console.error({
        message: 'Invalid environment variables',
        payload: _env.error.format(),
      });

      throw new Error('Invalid environment variables');
    }

    return _env.data;
  }
}

export default ZodEnv;
