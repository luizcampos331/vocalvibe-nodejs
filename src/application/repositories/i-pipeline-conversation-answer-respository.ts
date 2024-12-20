import PipelineConversationAnswer from '@/domain/entities/pipeline-conversation-answer';

export interface IPipelineConversationAnswerRepository {
  create(data: PipelineConversationAnswer): Promise<void>;
}
