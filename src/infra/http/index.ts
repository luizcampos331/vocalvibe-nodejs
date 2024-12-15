import { env } from '@/main';
import QuestionController from '../controllers/question-controller';
import { IHttpServer } from './i-http-server';
import PipelineConversationController from '../controllers/pipeline-conversation-controller';

class Http {
  constructor(private readonly httpServer: IHttpServer) {}

  public execute() {
    new QuestionController(this.httpServer);
    new PipelineConversationController(this.httpServer);
    this.httpServer.registerAfterMiddlewares();
    this.httpServer.listen(env.HTTP_PORT, () => {
      console.log(`Server is running on port - ${env.HTTP_PORT}`);
    });
  }
}

export default Http;
