/* eslint-disable import/no-mutable-exports */
import { createServer } from 'node:http';
import { EnvProps } from './infra/env/env-props';
import EnvFactory from './infra/factories/envs/envs-factory';

export let env: EnvProps;

(async () => {
  env = await EnvFactory.loadEnvs({ test: false });

  const {
    HttpFactory,
    Mediator,
    WebsocketGatewayFactory,
    PipelineConversationController,
    QuestionController,
  } = await dynamicImports();

  const httpServer = new HttpFactory().make();
  const websocketGateway = new WebsocketGatewayFactory().make();
  const mediator = Mediator.getInstance();

  const websocektServer = createServer();
  websocketGateway.start(websocektServer);
  websocektServer.listen(env.WEBSOCKET_PORT, () => {
    console.log(`WebSocket server is running on port - ${env.WEBSOCKET_PORT}`);
  });

  new PipelineConversationController(httpServer, mediator, websocketGateway);
  new QuestionController(httpServer);

  httpServer.start(env.HTTP_PORT, () => {
    console.log(`HTTP server is running on port - ${env.HTTP_PORT}`);
  });
})();

async function dynamicImports() {
  const { default: HttpFactory } = await import(
    '@/infra/factories/http/http-factory'
  );
  const { default: Mediator } = await import(
    '@/infra/gateways/meditor/mediator'
  );
  const { default: WebsocketGatewayFactory } = await import(
    '@/infra/factories/gateways/websocket-gateway-factory'
  );
  const { default: PipelineConversationController } = await import(
    './infra/controllers/pipeline-conversation-controller'
  );
  const { default: QuestionController } = await import(
    './infra/controllers/question-controller'
  );

  return {
    HttpFactory,
    Mediator,
    WebsocketGatewayFactory,
    PipelineConversationController,
    QuestionController,
  };
}
