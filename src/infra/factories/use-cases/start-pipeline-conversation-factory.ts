import StartPipelineConversationUseCase from '@/application/use-cases/start-pipeline-conversation-use-case';
import Mediator from '@/infra/gateways/meditor/mediator';
import DatabaseFactory from '../database/database-factory';
import PipelineConversationRepositoryFactory from '../repositories/pipeline-conversation-repository-factory';
import PipelineConversationQuestionQueryFactory from '../queries/pipeline-conversation-question-query-factory';

class StartPipelineConversationFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new StartPipelineConversationUseCase(
      new PipelineConversationRepositoryFactory().make(databaseConfig),
      new PipelineConversationQuestionQueryFactory().make(databaseConfig),
      databaseConfig,
      Mediator.getInstance(),
    );
  }
}

export default StartPipelineConversationFactory;
