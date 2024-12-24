import StatusCode from '@/infra/http/enums/status-code';
import { IMediator } from '@/application/gateways/i-mediator';
import { env } from '@/main';
import { SendQuestionToUserInput } from '@/application/use-cases/pipeline-conversations/send-question-to-user-use-case';
import { IWebsocketGateway } from '@/application/gateways/i-websocket-gateway';
import { AnswersQuestionInput } from '@/application/use-cases/pipeline-conversations/answers-question-use-case';
import { FinishPipelineConversationInput } from '@/application/use-cases/pipeline-conversations/finish-pipeline-conversation-use-case';
import { IHttpServer } from '../http/i-http-server';
import CreatePipelineConversationFactory from '../factories/use-cases/pipeline-conversations/create-pipeline-conversation-factory';
import StartPipelineConversationFactory from '../factories/use-cases/pipeline-conversations/start-pipeline-conversation-factory';
import SendQuestionToUserFactory from '../factories/use-cases/pipeline-conversations/send-question-to-user-factory';
import AnswersQuestionFactory from '../factories/use-cases/pipeline-conversations/answers-question-factory';
import FinishPipelineConversationFactory from '../factories/use-cases/pipeline-conversations/finish-pipeline-conversation-factory';

class PipelineConversationController {
  private urlBase = '/pipeline-conversations';

  constructor(
    readonly httpServer: IHttpServer,
    readonly mediator: IMediator,
    readonly websocketGateway: IWebsocketGateway,
  ) {
    this.create(httpServer);
    this.start(httpServer);
    this.sentQuestionToUser(mediator);
    this.answerQuestion(websocketGateway);
    this.finish(mediator);
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
        const sendQuestionToUserUseCase =
          new SendQuestionToUserFactory().make();
        await sendQuestionToUserUseCase.execute(data);
      },
    });
  }

  private answerQuestion(websocketGateway: IWebsocketGateway) {
    websocketGateway.listen({
      event: env.ANSWER_QUESTION_EVENT,
      room: env.CONVERSATION_ROOM,
      callback: async (data: AnswersQuestionInput) => {
        console.log('data', data);

        const answersQuestionUseCase = new AnswersQuestionFactory().make();
        await answersQuestionUseCase.execute(data);
      },
    });
  }

  private finish(mediator: IMediator) {
    mediator.consume({
      event: env.FINISH_PIPELINE_CONVERSATION_EVENT,
      callback: async (data: FinishPipelineConversationInput) => {
        const finishPipelineConversationUseCase =
          new FinishPipelineConversationFactory().make();
        await finishPipelineConversationUseCase.execute(data);
      },
    });
  }
}

export default PipelineConversationController;
