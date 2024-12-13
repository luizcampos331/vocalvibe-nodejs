import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import ExpressHttpServer from '@/infra/http/implementations/express/express-http-server';
import { env } from '@/main';

const implementations = {
  express: new ExpressHttpServer(),
};

class HttpFactory {
  public make() {
    if (!Object.keys(implementations).includes(env.HTTP_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid http implementation');
    }
    return implementations[env.HTTP_IMPLEMENTATION];
  }
}

export default HttpFactory;
