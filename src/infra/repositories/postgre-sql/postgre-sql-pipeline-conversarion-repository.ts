import { IDatabaseConfig } from '@/application/database/i-database-config';
import { IPipelineConversationRepository } from '@/application/repositories/i-pipeline-conversation-respository';
import PipelineConversation from '@/domain/entities/pipeline-conversation';

class PostgreSqlPipelineConversationRepository
  implements IPipelineConversationRepository
{
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async create(data: PipelineConversation): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO pipeline_conversations (id, created_by, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
      [
        dataJson.id,
        dataJson.createdBy,
        dataJson.status,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlPipelineConversationRepository;
