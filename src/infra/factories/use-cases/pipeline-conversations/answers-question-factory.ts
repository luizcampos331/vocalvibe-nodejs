import AnswersQuestionUseCase from '@/application/use-cases/pipeline-conversations/answers-question-use-case';
import Mediator from '@/infra/gateways/meditor/mediator';
import DatabaseFactory from '../../database/database-factory';
import PipelineConversationQuestionRepositoryFactory from '../../repositories/pipeline-conversation-question-repository-factory';
import StorageGatewayFactory from '../../gateways/storage-gateway-factory';
import PipelineConversationAnswerRepositoryFactory from '../../repositories/pipeline-conversation-question-answer-factory';
import LlmGatewayFactory from '../../gateways/llm-gateway-factory';

class AnswersQuestionFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new AnswersQuestionUseCase(
      new PipelineConversationQuestionRepositoryFactory().make(databaseConfig),
      new PipelineConversationAnswerRepositoryFactory().make(databaseConfig),
      new StorageGatewayFactory().make(),
      new LlmGatewayFactory().make(),
      Mediator.getInstance(),
      databaseConfig,
    );
  }
}

export default AnswersQuestionFactory;
