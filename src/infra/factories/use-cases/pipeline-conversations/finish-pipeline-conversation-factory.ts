import FinishPipelineConversationUseCase from '@/application/use-cases/pipeline-conversations/finish-pipeline-conversation-use-case';
import DatabaseFactory from '../../database/database-factory';
import PipelineConversationRepositoryFactory from '../../repositories/pipeline-conversation-repository-factory';
import WebsocketGatewayFactory from '../../gateways/websocket-gateway-factory';

class FinishPipelineConversationFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new FinishPipelineConversationUseCase(
      new PipelineConversationRepositoryFactory().make(databaseConfig),
      new WebsocketGatewayFactory().make(),
    );
  }
}

export default FinishPipelineConversationFactory;
