import Question from '@/domain/entities/question';
import FileTmp from '@/domain/value-object/file-tmp';
import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';
import FileFolder from '@/shared/enum/file-folder';
import { IQuestionRepository } from '../repositories/i-question-repository';
import { IStorageGateway } from '../gateways/i-storage-gateway';
import { ILlmGateway } from '../gateways/i-llm-gateway';
import { IDatabaseConfig } from '../database/i-database-config';

export type CreateQuestionFromAudioUseCaseInput = {
  userId: string;
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
    userId,
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
        folder: FileFolder.questionAudio,
      });

      const question = Question.create({
        createdBy: userId,
        context,
        goalLanguage,
        nativeLanguage,
        filename,
        duration: 0,
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
