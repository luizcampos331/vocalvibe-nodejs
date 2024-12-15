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
    const questionRepository = new QuestionRepositoryFactory().make(
      databaseConfig,
    );
    const llmTokensRepository = new LlmTokensRepositoryFactory().make(
      databaseConfig,
    );
    const pipelineConversationRepository =
      new PipelineConversationRepositoryFactory().make(databaseConfig);
    const pipelineConversationQuestionRepository =
      new PipelineConversationQuestionRepositoryFactory().make(databaseConfig);
    const llmGateway = new LlmGatewayFactory().make();

    return new CreatePipelineConversationUseCase(
      questionRepository,
      llmTokensRepository,
      pipelineConversationRepository,
      pipelineConversationQuestionRepository,
      llmGateway,
      databaseConfig,
    );
  }
}

export default CreatePipelineConversationFactory;
