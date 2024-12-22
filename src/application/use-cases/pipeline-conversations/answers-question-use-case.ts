import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';
import PipelineConversationAnswer from '@/domain/entities/pipeline-conversation-answer';
import { env } from '@/main';
import FileTmp from '@/domain/value-object/file-tmp';
import { IPipelineConversationQuestionQuery } from '@/application/queries/i-pipeline-conversation-question-query';
import { ApplicationError } from '../../errors/application-error';
import { IStorageGateway } from '../../gateways/i-storage-gateway';
import { IMediator } from '../../gateways/i-mediator';
import { IPipelineConversationQuestionRepository } from '../../repositories/i-pipeline-conversation-question-respository';
import { IDatabaseConfig } from '../../database/i-database-config';
import { IPipelineConversationAnswerRepository } from '../../repositories/i-pipeline-conversation-answer-respository';
import { ILlmGateway } from '../../gateways/i-llm-gateway';
import { SendQuestionToUserInput } from './send-question-to-user-use-case';
import { FinishPipelineConversationInput } from './finish-pipeline-conversation-use-case';

export type AnswersQuestionInput = {
  pipelineConversationQuestionId: string;
  filename: string;
  fileBufer: Buffer;
};

class AnswersQuestionUseCase {
  constructor(
    private readonly pipelineConversationQuestionRepository: IPipelineConversationQuestionRepository,
    private readonly pipelineConversationAnswerRepository: IPipelineConversationAnswerRepository,
    private readonly pipelineConversationQuestionQuery: IPipelineConversationQuestionQuery,
    private readonly storageGateway: IStorageGateway,
    private readonly llmGateway: ILlmGateway,
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

      const file = new FileTmp(filename);
      await file.saveTmp(fileBufer);
      const { contentType, fileSize } = await file.getInfos();

      const { text, duration } = await this.llmGateway.transcribeAudio({
        filePath: file.getFilePath(),
      });

      await this.pipelineConversationAnswerRepository.create(
        PipelineConversationAnswer.create({
          pipelineConversationQuestionId,
          filename,
          text,
          duration,
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
        contentType,
        fileSize,
      });
      await this.databaseConfig.commit();

      const nextPipelineConversationQuestion =
        await this.pipelineConversationQuestionQuery.getNextQuestionIdByPipelineConversation(
          {
            pipelineConversationId:
              pipelineConversationQuestion.pipelineConversationId,
          },
        );

      if (!nextPipelineConversationQuestion) {
        this.mediator.notify<FinishPipelineConversationInput>({
          event: env.FINISH_PIPELINE_CONVERSATION_EVENT,
          data: {
            pipelineConversationId:
              pipelineConversationQuestion.pipelineConversationId,
          },
        });

        return;
      }

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
