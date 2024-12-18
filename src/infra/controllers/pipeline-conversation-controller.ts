import StatusCode from '@/infra/http/enums/status-code';
import { IMediator } from '@/application/gateways/i-mediator';
import { env } from '@/main';
import { SendQuestionToUserInput } from '@/application/use-cases/send-question-to-user-use-case';
import { IHttpServer } from '../http/i-http-server';
import CreatePipelineConversationFactory from '../factories/use-cases/create-pipeline-conversation-factory';
import StartPipelineConversationFactory from '../factories/use-cases/start-pipeline-conversation-factory';
import SendQuestionToUserFactory from '../factories/use-cases/send-question-to-user-factory';

class PipelineConversationController {
  private urlBase = '/pipeline-conversations';

  constructor(
    readonly httpServer: IHttpServer,
    readonly mediator: IMediator,
  ) {
    this.create(httpServer);
    this.start(httpServer);
    this.sentQuestionToUser(mediator);
  }

  private create(httpServer: IHttpServer) {
    httpServer.registerRoute({
      method: 'post',
      url: this.urlBase,
      callback: async () => {
        const createPipelineConversationUseCase =
          new CreatePipelineConversationFactory().make();

        const { id } = await createPipelineConversationUseCase.execute();

        return {
          statusCode: StatusCode.CREATED,
          output: { id },
        };
      },
    });
  }

  private start(httpServer: IHttpServer) {
    httpServer.registerRoute({
      method: 'post',
      url: `${this.urlBase}/:id/start`,
      callback: async ({ params: { id } }) => {
        const startPipelineConversationUseCase =
          new StartPipelineConversationFactory().make();

        await startPipelineConversationUseCase.execute({
          id,
        });

        return {
          statusCode: StatusCode.NO_CONTENT,
        };
      },
    });
  }

  private sentQuestionToUser(mediator: IMediator) {
    mediator.consume({
      event: env.SEND_QUESTION_TO_USER_EVENT,
      callback: async (data: SendQuestionToUserInput) => {
        const sendQuestionToUserFactory =
          new SendQuestionToUserFactory().make();
        await sendQuestionToUserFactory.execute(data);
      },
    });
  }
}

export default PipelineConversationController;
