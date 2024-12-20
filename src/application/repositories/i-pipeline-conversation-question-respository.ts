import PipelineConversationQuestion from '@/domain/entities/pipeline-conversation-question';

export interface IPipelineConversationQuestionRepository {
  findById(
    data: FindPipelineConvertionQuestionByIdInput,
  ): Promise<PipelineConversationQuestion | null>;
  create(data: PipelineConversationQuestion): Promise<void>;
  update(data: PipelineConversationQuestion): Promise<void>;
}

export type FindPipelineConvertionQuestionByIdInput = {
  id: string;
};
