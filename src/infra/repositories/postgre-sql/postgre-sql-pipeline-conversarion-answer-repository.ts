import { IDatabaseConfig } from '@/application/database/i-database-config';
import { IPipelineConversationAnswerRepository } from '@/application/repositories/i-pipeline-conversation-answer-respository';
import PipelineConversationAnswer from '@/domain/entities/pipeline-conversation-answer';

class PostgreSqlPipelineConversationAnswerRepository
  implements IPipelineConversationAnswerRepository
{
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async create(data: PipelineConversationAnswer): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO pipeline_conversation_questions (id, pipeline_conversation_question_id, filename, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
      [
        dataJson.id,
        dataJson.pipelineConversationQuestionId,
        dataJson.filename,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlPipelineConversationAnswerRepository;
