/* eslint-disable import/no-mutable-exports */
import { EnvProps } from './infra/env/env-props';
import EnvFactory from './infra/factories/envs/envs-factory';

export let env: EnvProps;

async function dynamicImports() {
  const { default: HttpFactory } = await import(
    '@/infra/factories/http/http-factory'
  );
  const { default: Http } = await import('@/infra/http');

  return {
    HttpFactory,
    Http,
  };
}

(async () => {
  env = await EnvFactory.loadEnvs({ test: false });

  const { HttpFactory, Http } = await dynamicImports();

  new Http(new HttpFactory().make()).execute();
})();
