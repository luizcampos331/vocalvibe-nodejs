import LlmTokens from '@/domain/entities/llm-tokens';

export interface ILlmTokensRepository {
  create(question: LlmTokens, databaseClient: any): Promise<void>;
}
