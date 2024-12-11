import Envs from './infra/env';
import { EnvProps } from './infra/env/env-props';

export let env: EnvProps;

async function dynamicImports() {}

(async () => {
  env = Envs.getInstance().getEnvs();

  const {} = await dynamicImports();
})();
