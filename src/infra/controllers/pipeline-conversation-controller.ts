import StatusCode from '@/infra/http/enums/status-code';
import { IHttpServer } from '../http/i-http-server';
import CreatePipelineConversationFactory from '../factories/use-cases/create-pipeline-conversation-factory';

class PipelineConversationController {
  private urlBase = '/pipeline-conversations';

  constructor(readonly httpServer: IHttpServer) {
    this.create(httpServer);
  }

  private create(httpServer: IHttpServer) {
    httpServer.registerRoute({
      method: 'post',
      url: this.urlBase,
      callback: async () => {
        const createPipelineConversationUseCase =
          new CreatePipelineConversationFactory().make();

        await createPipelineConversationUseCase.execute();

        return {
          statusCode: StatusCode.CREATED,
        };
      },
    });
  }
}

export default PipelineConversationController;
