import 'express-async-errors';
import express, { Express } from 'express';
import { env } from '@/main';
import StatusCode from '@/infra/http/enums/status-code';

import {
  IHttpServer,
  IRegisterHttpServer,
  Middlewares,
} from '../../i-http-server';
import validateCORS from './middlewares/validate-cors';
import globalErrors from './middlewares/global-errors';
import Multer from './middlewares/multer';

class ExpressHttpServer implements IHttpServer {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(validateCORS);
    this.app.use(express.json({ limit: env.REQUEST_BODY_LIMIT }));
    this.app.use(
      express.urlencoded({ limit: env.REQUEST_BODY_LIMIT, extended: true }),
    );
  }

  public registerMiddlewaresRoute(data?: Middlewares): any[] {
    const middlewares = [];

    if (data?.uploadFile) {
      middlewares.push(new Multer().single(data.uploadFile));
    }

    return middlewares;
  }

  public registerRoute({
    method,
    url,
    middlewares,
    callback,
  }: IRegisterHttpServer): void {
    this.app[method](
      url,
      ...this.registerMiddlewaresRoute(middlewares),
      async (request, response) => {
        const { statusCode = StatusCode.OK, output } = await callback({
          body: request.body,
          params: request.params,
          query: request.query,
          file: {
            filename: request.file?.filename,
          },
        });

        response.status(statusCode).json(output);
      },
    );
  }

  private registerAfterMiddlewares(): void {
    this.app.use(globalErrors);
  }

  public start(port: number, callback?: () => void): void {
    this.registerAfterMiddlewares();
    this.app.listen(port, callback);
  }
}

export default ExpressHttpServer;
