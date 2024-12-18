import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';
import { env } from '@/main';
import { IPipelineConversationRepository } from '../repositories/i-pipeline-conversation-respository';
import { ApplicationError } from '../errors/application-error';
import { IPipelineConversationQuestionQuery } from '../queries/i-pipeline-conversation-question-query';
import { IMediator } from '../gateways/i-mediator';
import { IDatabaseConfig } from '../database/i-database-config';
import { SendQuestionToUserInput } from './send-question-to-user-use-case';

export type StartPipelineConversationUseCaseInput = {
  id: string;
};

class StartPipelineConversationUseCase {
  constructor(
    private readonly pipelineConversationRepository: IPipelineConversationRepository,
    private readonly pipelineConversationQuestionQuery: IPipelineConversationQuestionQuery,
    private readonly databaseConfig: IDatabaseConfig,
    private readonly mediator: IMediator,
  ) {}

  public async execute({
    id,
  }: StartPipelineConversationUseCaseInput): Promise<void> {
    try {
      await this.databaseConfig.startTransaction();

      const pipelineConversation =
        await this.pipelineConversationRepository.findById({
          id,
        });

      if (!pipelineConversation) {
        throw new ApplicationError('Pipeline conversation not found');
      }

      pipelineConversation.start();
      await this.pipelineConversationRepository.update(pipelineConversation);

      const pipelineConversationQuestionId =
        await this.pipelineConversationQuestionQuery.getNextQuestionId({
          pipelineConversationId: id,
        });

      if (!pipelineConversationQuestionId) {
        throw new ApplicationError(
          'First pipeline conversation question not found',
        );
      }

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
      throw new ExceptionError('Start conversation', error);
    }
  }
}

export default StartPipelineConversationUseCase;
