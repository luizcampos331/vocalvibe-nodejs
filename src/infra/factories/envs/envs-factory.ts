import * as dotenv from 'dotenv';
import ZodEnv from '@/infra/env/zod/zod-env';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import { EnvProps } from '@/infra/env/env-props';

const implementations = {
  zod: new ZodEnv(),
};

class EnvFactory {
  public static loadEnvs({ test }: { test: boolean }): Promise<EnvProps> {
    if (
      !Object.keys(implementations).includes(
        process.env.ENVS_IMPLEMENTATION || 'zod',
      )
    ) {
      throw new InfrastructureError('Invalid database implementation');
    }

    if (test) {
      dotenv.config({ path: '.env.test' });
    }

    dotenv.config();

    return new Promise(resolve => {
      resolve(
        implementations[
          (process.env.DATABASE_IMPLEMENTATION ||
            'zod') as keyof typeof implementations
        ].validateEnv(process.env),
      );
    });
  }
}

export default EnvFactory;
