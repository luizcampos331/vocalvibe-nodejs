import PipelineConversation from '@/domain/entities/pipeline-conversation';

export interface IPipelineConversationRepository {
  findById(
    data: FindPipelineConversationByIdInput,
  ): Promise<PipelineConversation | null>;
  create(data: PipelineConversation): Promise<void>;
  update(data: PipelineConversation): Promise<void>;
}

export type FindPipelineConversationByIdInput = {
  id: string;
};
