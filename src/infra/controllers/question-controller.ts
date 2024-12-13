import StatusCode from '@/infra/http/enums/status-code';
import CreateQuestionFromAudioFactory from '../factories/use-cases/create-question-from-audio-factory';
import { IHttpServer } from '../http/i-http-server';

class QuestionController {
  private urlBase = '/question';

  constructor(readonly httpServer: IHttpServer) {
    this.createFromAudio(httpServer);
  }

  private createFromAudio(httpServer: IHttpServer) {
    httpServer.registerRoute({
      method: 'post',
      url: this.urlBase,
      middlewares: { uploadFile: 'audio' },
      callback: async ({ body: { data, file } }) => {
        const createQuestionFromAudioUseCase =
          new CreateQuestionFromAudioFactory().make();

        await createQuestionFromAudioUseCase.execute({
          userId: data.userId,
          context: data.context,
          audioFilename: file?.filename,
        });

        return {
          statusCode: StatusCode.CREATED,
        };
      },
    });
  }
}

export default QuestionController;
