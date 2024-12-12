import CreateQuestionFromAudioUseCase from '@/application/use-cases/create-question-from-audio-use-case';
import DatabaseFactory from '../database/database-factory';
import QuestionRepositoryFactory from '../repositories/question-repository-factory';
import StorageGatewayFactory from '../gateways/storage-gateway-factory';
import LlmGatewayFactory from '../gateways/llm-gateway-factory';

class CreateQuestionFromAudioFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    const questionRepository = new QuestionRepositoryFactory().make(
      databaseConfig,
    );
    const storageGateway = new StorageGatewayFactory().make();
    const llmGateway = new LlmGatewayFactory().make();

    return new CreateQuestionFromAudioUseCase(
      questionRepository,
      storageGateway,
      llmGateway,
      databaseConfig,
    );
  }
}

export default CreateQuestionFromAudioFactory;
