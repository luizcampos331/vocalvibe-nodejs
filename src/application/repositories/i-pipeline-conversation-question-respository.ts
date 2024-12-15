import PipelineConversationQuestion from '@/domain/entities/pipeline-conversation-question';

export interface IPipelineConversationQuestionRepository {
  create(data: PipelineConversationQuestion): Promise<void>;
}
