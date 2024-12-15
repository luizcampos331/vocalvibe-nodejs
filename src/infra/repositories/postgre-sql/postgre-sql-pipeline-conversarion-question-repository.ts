import { IDatabaseConfig } from '@/application/database/i-database-config';
import { IPipelineConversationQuestionRepository } from '@/application/repositories/i-pipeline-conversation-question-respository';
import PipelineConversationQuestion from '@/domain/entities/pipeline-conversation-question';

class PostgreSqlPipelineConversationQuestionRepository
  implements IPipelineConversationQuestionRepository
{
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async create(data: PipelineConversationQuestion): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO pipeline_conversation_questions (id, pipeline_conversation_id, question, filename, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        dataJson.id,
        dataJson.pipelineConversationId,
        dataJson.question,
        dataJson.filename,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlPipelineConversationQuestionRepository;
