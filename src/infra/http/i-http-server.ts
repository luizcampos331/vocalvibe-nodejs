import StatusCode from '@/infra/http/enums/status-code';

export interface IHttpServer {
  registerMiddlewaresRoute(data?: Middlewares): any[];
  registerRoute(data: IRegisterHttpServer): void;
  getClient(): any;
}

export type IRegisterHttpServer = {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  middlewares?: Middlewares;
  callback: (data: HttpCallbackInput) => Promise<HttpCallbackOutput>;
};

type HttpCallbackInput = {
  params: any;
  body: any;
  query: any;
  file: {
    filename?: string;
  };
};

type HttpCallbackOutput = {
  statusCode?: StatusCode;
  output?: any;
};

export type Middlewares = {
  uploadFile?: string;
};
