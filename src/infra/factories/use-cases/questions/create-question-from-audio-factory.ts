import CreateQuestionFromAudioUseCase from '@/application/use-cases/questions/create-question-from-audio-use-case';
import DatabaseFactory from '../../database/database-factory';
import QuestionRepositoryFactory from '../../repositories/question-repository-factory';
import StorageGatewayFactory from '../../gateways/storage-gateway-factory';
import LlmGatewayFactory from '../../gateways/llm-gateway-factory';

class CreateQuestionFromAudioFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new CreateQuestionFromAudioUseCase(
      new QuestionRepositoryFactory().make(databaseConfig),
      new StorageGatewayFactory().make(),
      new LlmGatewayFactory().make(),
      databaseConfig,
    );
  }
}

export default CreateQuestionFromAudioFactory;
