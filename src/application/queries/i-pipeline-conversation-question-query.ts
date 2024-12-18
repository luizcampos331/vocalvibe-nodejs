export interface IPipelineConversationQuestionQuery {
  getNextQuestionId(data: GetNextQuestionIdInput): Promise<string | null>;
}

export type GetNextQuestionIdInput = {
  pipelineConversationId: string;
};
