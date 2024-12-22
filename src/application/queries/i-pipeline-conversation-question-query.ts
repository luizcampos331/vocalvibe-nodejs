export interface IPipelineConversationQuestionQuery {
  getNextQuestionIdByPipelineConversation(
    data: GetNextQuestionIdNyPipelineConversationInput,
  ): Promise<string | null>;
}

export type GetNextQuestionIdNyPipelineConversationInput = {
  pipelineConversationId: string;
};
