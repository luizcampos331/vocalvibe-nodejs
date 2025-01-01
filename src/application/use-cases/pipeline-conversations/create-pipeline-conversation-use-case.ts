import { HandleError } from '@/shared/errors/handle-error';
import { ExceptionError } from '@/shared/errors/exception-error';
import LlmTokens, { LlmTokensEntity } from '@/domain/entities/llm-tokens';
import PipelineConversation, {
  PipelineConversationStatus,
} from '@/domain/entities/pipeline-conversation';
import PipelineConversationQuestion from '@/domain/entities/pipeline-conversation-question';
import { IDatabaseConfig } from '../../database/i-database-config';
import { ILlmGateway } from '../../gateways/i-llm-gateway';
import { ILlmTokensRepository } from '../../repositories/i-llm-tokens-repository';
import { IQuestionRepository } from '../../repositories/i-question-repository';
import { IPipelineConversationRepository } from '../../repositories/i-pipeline-conversation-respository';
import { IPipelineConversationQuestionRepository } from '../../repositories/i-pipeline-conversation-question-respository';
import { ApplicationError } from '../../errors/application-error';

export type CreatePipelineConversationOutput = {
  id: string;
};

class CreatePipelineConversationUseCase {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly llmTokensRepository: ILlmTokensRepository,
    private readonly pipelineConversationRepository: IPipelineConversationRepository,
    private readonly pipelineConversationQuestionRepository: IPipelineConversationQuestionRepository,
    private readonly llmGateway: ILlmGateway,
    private readonly databaseConfig: IDatabaseConfig,
  ) {}

  public async execute(): Promise<CreatePipelineConversationOutput> {
    try {
      await this.databaseConfig.startTransaction();
      const questions = await this.questionRepository.list();

      const { response, inputToken, outputToken } =
        await this.llmGateway.getResponseByText({
          messages: [
            {
              role: 'system',
              content:
                'You are a supreme expert in analyzing and creating logical sequences of questions based on a large list of them. Your objective is:\n- Analyze all the questions\n- Create a logical sequence with 20 maximum questions of them\n- Return ONLY their numbers, separated by commas',
            },
            {
              role: 'user',
              content: questions
                .map(
                  (question, index) => `${index + 1}) ${question.goalLanguage}`,
                )
                .join('\n'),
            },
          ],
        });

      if (!response) {
        throw new ApplicationError('Invalid response from LLM');
      }

      const pipelineConversation = PipelineConversation.create({
        status: PipelineConversationStatus.create,
      });

      await this.pipelineConversationRepository.create(pipelineConversation);

      for (const item of response.split(',')) {
        const question = questions[Number(item) - 1];

        await this.pipelineConversationQuestionRepository.create(
          PipelineConversationQuestion.create({
            pipelineConversationId: pipelineConversation.id,
            questionId: question.id,
          }),
        );
      }

      await this.llmTokensRepository.create(
        LlmTokens.create({
          entity: LlmTokensEntity.sequentialQuestions,
          inputTokens: inputToken,
          outputTokens: outputToken,
          entityId: pipelineConversation.id,
        }),
      );

      await this.databaseConfig.commit();

      return {
        id: pipelineConversation.id,
      };
    } catch (error) {
      await this.databaseConfig.rollback();

      if (error instanceof HandleError) {
        throw error;
      }

      throw new ExceptionError('Create pipeline conversation error', error);
    }
  }
}

export default CreatePipelineConversationUseCase;
