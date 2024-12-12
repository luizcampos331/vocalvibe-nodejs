import { IDatabaseConfig } from '@/application/database/i-database-config';
import { ILlmTokensRepository } from '@/application/repositories/i-llm-tokens-repository';
import LlmTokens from '@/domain/entities/llm-tokens';

class PostgreSqlLlmTokensRepository implements ILlmTokensRepository {
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async create(data: LlmTokens): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO llm_tokens (id, entity_id, input_tokens, output_tokens, entity, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        dataJson.id,
        dataJson.entityId,
        dataJson.inputTokens,
        dataJson.outputTokens,
        dataJson.entity,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlLlmTokensRepository;
