import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';
import PipelineConversationAnswer from '@/domain/entities/pipeline-conversation-answer';
import { env } from '@/main';
import { ApplicationError } from '../errors/application-error';
import { IStorageGateway } from '../gateways/i-storage-gateway';
import { IMediator } from '../gateways/i-mediator';
import { IPipelineConversationQuestionRepository } from '../repositories/i-pipeline-conversation-question-respository';
import { IDatabaseConfig } from '../database/i-database-config';
import { IPipelineConversationAnswerRepository } from '../repositories/i-pipeline-conversation-answer-respository';
import { SendQuestionToUserInput } from './send-question-to-user-use-case';

export type AnswersQuestionInput = {
  pipelineConversationQuestionId: string;
  filename: string;
  fileBufer: Buffer;
};

class AnswersQuestionUseCase {
  constructor(
    private readonly pipelineConversationQuestionRepository: IPipelineConversationQuestionRepository,
    private readonly pipelineConversationAnswerRepository: IPipelineConversationAnswerRepository,
    private readonly storageGateway: IStorageGateway,
    private readonly mediator: IMediator,
    private readonly databaseConfig: IDatabaseConfig,
  ) {}

  public async execute({
    pipelineConversationQuestionId,
    filename,
    fileBufer,
  }: AnswersQuestionInput) {
    try {
      await this.databaseConfig.startTransaction();
      const pipelineConversationQuestion =
        await this.pipelineConversationQuestionRepository.findById({
          id: pipelineConversationQuestionId,
        });

      if (!pipelineConversationQuestion) {
        throw new ApplicationError('Pipeline conversation question not found');
      }

      await this.pipelineConversationAnswerRepository.create(
        PipelineConversationAnswer.create({
          pipelineConversationQuestionId,
          filename,
        }),
      );

      pipelineConversationQuestion.answer();
      await this.pipelineConversationQuestionRepository.update(
        pipelineConversationQuestion,
      );

      await this.storageGateway.save({
        filename,
        folder: 'answer-audio',
        content: fileBufer,
        contentType: '',
        fileSize: 0,
      });
      await this.databaseConfig.commit();

      this.mediator.notify<SendQuestionToUserInput>({
        event: env.SEND_QUESTION_TO_USER_EVENT,
        data: { pipelineConversationQuestionId },
      });
    } catch (error) {
      await this.databaseConfig.rollback();
      if (error instanceof HandleError) {
        throw error;
      }
      throw new ExceptionError('Answers question', error);
    }
  }
}

export default AnswersQuestionUseCase;
