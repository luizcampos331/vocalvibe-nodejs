import PipelineConversation from '@/domain/entities/pipeline-conversation';

export interface IPipelineConversationRepository {
  create(data: PipelineConversation): Promise<void>;
}
