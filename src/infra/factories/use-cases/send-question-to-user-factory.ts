import SendQuestionToUserUseCase from '@/application/use-cases/send-question-to-user-use-case';
import PipelineConversationQuestionRepositoryFactory from '../repositories/pipeline-conversation-question-repository-factory';
import DatabaseFactory from '../database/database-factory';
import QuestionRepositoryFactory from '../repositories/question-repository-factory';
import StorageGatewayFactory from '../gateways/storage-gateway-factory';
import WebsocketGatewayFactory from '../gateways/websocket-gateway-factory';

class SendQuestionToUserFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new SendQuestionToUserUseCase(
      new PipelineConversationQuestionRepositoryFactory().make(databaseConfig),
      new QuestionRepositoryFactory().make(databaseConfig),
      new StorageGatewayFactory().make(),
      new WebsocketGatewayFactory().make(),
    );
  }
}

export default SendQuestionToUserFactory;
