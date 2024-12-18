import CreatePipelineConversationUseCase from '@/application/use-cases/create-pipeline-conversation-use-case';
import DatabaseFactory from '../database/database-factory';
import LlmGatewayFactory from '../gateways/llm-gateway-factory';
import QuestionRepositoryFactory from '../repositories/question-repository-factory';
import PipelineConversationRepositoryFactory from '../repositories/pipeline-conversation-repository-factory';
import PipelineConversationQuestionRepositoryFactory from '../repositories/pipeline-conversation-question-repository-factory';
import LlmTokensRepositoryFactory from '../repositories/llm-tokens-repository-factory';

class CreatePipelineConversationFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new CreatePipelineConversationUseCase(
      new QuestionRepositoryFactory().make(databaseConfig),
      new LlmTokensRepositoryFactory().make(databaseConfig),
      new PipelineConversationRepositoryFactory().make(databaseConfig),
      new PipelineConversationQuestionRepositoryFactory().make(databaseConfig),
      new LlmGatewayFactory().make(),
      databaseConfig,
    );
  }
}

export default CreatePipelineConversationFactory;
