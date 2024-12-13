import Question from '@/domain/entities/question';
import FileTmp from '@/domain/value-object/file-tmp';
import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';
import { IQuestionRepository } from '../repositories/i-question-repository';
import { IStorageGateway } from '../gateways/i-storage-gateway';
import { ILlmGateway } from '../gateways/i-llm-gateway';
import { IDatabaseConfig } from '../database/i-database-config';
import { ApplicationError } from '../errors/application-error';

export type CreateQuestionFromAudioUseCaseInput = {
  userId: string;
  context: string;
  audioFilename?: string;
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
    audioFilename,
  }: CreateQuestionFromAudioUseCaseInput): Promise<void> {
    try {
      await this.databaseConfig.startTransaction();

      if (!audioFilename) {
        throw new ApplicationError('Audio not found');
      }

      const { fileSize, contentType, content } = await new FileTmp(
        audioFilename,
      ).getInfos();

      await this.storageGateway.save({
        filename: audioFilename,
        fileSize,
        content,
        contentType,
        folder: 'question-audio',
      });

      const { text, duration } = await this.llmGateway.transcribeAudio({
        filename: audioFilename,
      });

      const question = Question.create({
        createdBy: userId,
        context,
        content: text,
        duration,
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
