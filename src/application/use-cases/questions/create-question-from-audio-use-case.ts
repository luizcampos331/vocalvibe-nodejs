import { IDatabaseConfig } from '@/application/database/i-database-config';
import { ILlmGateway } from '@/application/gateways/i-llm-gateway';
import { IStorageGateway } from '@/application/gateways/i-storage-gateway';
import { IQuestionRepository } from '@/application/repositories/i-question-repository';
import Question from '@/domain/entities/question';
import FileTmp from '@/domain/value-object/file-tmp';
import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';

export type CreateQuestionFromAudioUseCaseInput = {
  context: string;
  nativeLanguage: string;
  goalLanguage: string;
};

class CreateQuestionFromAudioUseCase {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly storageGateway: IStorageGateway,
    private readonly llmGateway: ILlmGateway,
    private readonly databaseConfig: IDatabaseConfig,
  ) {}

  public async execute({
    context,
    nativeLanguage,
    goalLanguage,
  }: CreateQuestionFromAudioUseCaseInput): Promise<void> {
    try {
      await this.databaseConfig.startTransaction();
      const { audio } = await this.llmGateway.generateAudio({
        content: goalLanguage,
      });

      const file = new FileTmp('question.mp3');
      await file.saveTmp(audio);
      const { filename, fileSize, contentType } = await file.getInfos();

      await this.storageGateway.save({
        filename,
        fileSize,
        content: audio,
        contentType,
        folder: 'question-audio',
      });

      const question = Question.create({
        context,
        goalLanguage,
        nativeLanguage,
        filename,
      });

      await this.questionRepository.create(question);

      await this.databaseConfig.commit();
    } catch (error) {
      await this.databaseConfig.rollback();

      if (error instanceof HandleError) {
        throw error;
      }

      throw new ExceptionError('Create question from audio error', error);
    }
  }
}

export default CreateQuestionFromAudioUseCase;
