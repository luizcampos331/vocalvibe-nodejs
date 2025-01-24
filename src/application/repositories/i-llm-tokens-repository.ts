import LlmTokens from '@/domain/entities/llm-tokens';

export interface ILlmTokensRepository {
  create(data: LlmTokens): Promise<void>;
}
