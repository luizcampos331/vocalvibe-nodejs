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

      // Database
      DATABASE_IMPLEMENTATION: z.enum(['prisma']),
      DATABASE_URL: z.string(),
      LOGGING: z.coerce.boolean().default(false),
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
