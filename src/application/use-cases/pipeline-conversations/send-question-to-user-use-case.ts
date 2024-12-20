import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';
import { env } from '@/main';
import { IPipelineConversationQuestionRepository } from '../../repositories/i-pipeline-conversation-question-respository';
import { IQuestionRepository } from '../../repositories/i-question-repository';
import { ApplicationError } from '../../errors/application-error';
import { IStorageGateway } from '../../gateways/i-storage-gateway';
import { IWebsocketGateway } from '../../gateways/i-websocket-gateway';

export type SendQuestionToUserInput = {
  pipelineConversationQuestionId: string;
};

class SendQuestionToUserUseCase {
  constructor(
    private readonly pipelineConversationQuestionRepository: IPipelineConversationQuestionRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly storageGateway: IStorageGateway,
    private readonly websocketGateway: IWebsocketGateway,
  ) {}

  public async execute({
    pipelineConversationQuestionId,
  }: SendQuestionToUserInput) {
    try {
      const pipelineConversationQuestion =
        await this.pipelineConversationQuestionRepository.findById({
          id: pipelineConversationQuestionId,
        });

      if (!pipelineConversationQuestion) {
        throw new ApplicationError('Pipeline conversation question not found');
      }

      const questionRepository = await this.questionRepository.findById({
        id: pipelineConversationQuestion.questionId,
      });

      if (!questionRepository) {
        throw new ApplicationError('Question not found');
      }

      const audio = await this.storageGateway.get({
        filename: questionRepository.filename,
        folder: 'question-audio',
      });

      await this.websocketGateway.emit({
        room: env.CONVERSATION_ROOM,
        event: env.SEND_QUESTION_TO_USER_EVENT,
        data: {
          pipelineConversationQuestionId,
          question: {
            nativeLanguage: questionRepository.nativeLanguage,
            goalLanguage: questionRepository.goalLanguage,
            audio,
          },
        },
      });
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new ExceptionError('Send question to user', error);
    }
  }
}

export default SendQuestionToUserUseCase;
