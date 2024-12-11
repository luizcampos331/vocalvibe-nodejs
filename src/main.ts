import { EnvProps } from './infra/env/env-props';
import EnvFactory from './infra/factories/envs/envs-factory';

export let env: EnvProps;

async function dynamicImports() {}

(async () => {
  env = await EnvFactory.loadEnvs({ test: false });

  // const {} = await dynamicImports();
})();
