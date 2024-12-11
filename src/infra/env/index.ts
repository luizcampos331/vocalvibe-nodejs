import EnvFactory from '../factories/envs/envs-factory';
import { EnvProps } from './env-props';

class Env {
  private static instance: Env;
  public env!: EnvProps;

  public static getInstance() {
    if (!Env.instance) {
      Env.instance = new Env();
    }

    return Env.instance;
  }

  public validateEnv() {
    this.env = new EnvFactory().make().validateEnv(process.env);
  }

  public getEnvs() {
    return this.env;
  }
}

export default Env;
