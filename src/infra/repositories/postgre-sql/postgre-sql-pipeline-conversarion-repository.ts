import { IDatabaseConfig } from '@/application/database/i-database-config';
import {
  FindPipelineConversationByIdInput,
  IPipelineConversationRepository,
} from '@/application/repositories/i-pipeline-conversation-respository';
import PipelineConversation from '@/domain/entities/pipeline-conversation';

class PostgreSqlPipelineConversationRepository
  implements IPipelineConversationRepository
{
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async findById({
    id,
  }: FindPipelineConversationByIdInput): Promise<PipelineConversation | null> {
    const [pipelineConversation] = await this.databaseConfig.query(
      `SELECT
        id,
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM
        pipeline_conversations
      WHERE
        id = $1
        AND deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return pipelineConversation
      ? PipelineConversation.create(pipelineConversation)
      : null;
  }

  public async create(data: PipelineConversation): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO pipeline_conversations (id, status, created_at, updated_at) VALUES ($1, $2, $3, $4)',
      [dataJson.id, dataJson.status, dataJson.createdAt, dataJson.updatedAt],
    );
  }

  public async update(data: PipelineConversation): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'UPDATE pipeline_conversations SET status = $1, updated_at = $2 WHERE id = $3',
      [dataJson.status, dataJson.updatedAt, dataJson.id],
    );
  }
}

export default PostgreSqlPipelineConversationRepository;
