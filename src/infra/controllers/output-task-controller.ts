import StatusCode from '@/infra/http/enums/status-code';
import { IHttpServer } from '../http/i-http-server';
import CreateOutputTaskFactory from '../factories/use-cases/flow-ai-agents/create-output-task-factory';

class QuestionController {
  private urlBase = '/output-tasks';

  constructor(readonly httpServer: IHttpServer) {
    this.create(httpServer);
  }
  private create(httpServer: IHttpServer) {
    httpServer.registerRoute({
      method: 'post',
      url: this.urlBase,
      callback: async ({ body }) => {
        const createOutputTaskUseCase = new CreateOutputTaskFactory().make();

        await createOutputTaskUseCase.execute(body);

        return {
          statusCode: StatusCode.CREATED,
        };
      },
    });
  }
}

export default QuestionController;
