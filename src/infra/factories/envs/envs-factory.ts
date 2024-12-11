import ZodEnv from '@/infra/env/zod/zod-env';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';

const implementations = {
  zod: new ZodEnv(),
};

class EnvFactory {
  public make() {
    if (
      !Object.keys(implementations).includes(
        process.env.ENVS_IMPLEMENTATION || 'zod',
      )
    ) {
      throw new InfrastructureError('Invalid database implementation');
    }
    return implementations[
      (process.env.DATABASE_IMPLEMENTATION ||
        'zod') as keyof typeof implementations
    ];
  }
}

export default EnvFactory;
