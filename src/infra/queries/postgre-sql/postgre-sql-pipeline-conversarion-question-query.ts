import { IDatabaseConfig } from '@/application/database/i-database-config';
import {
  GetNextQuestionIdInput,
  IPipelineConversationQuestionQuery,
} from '@/application/queries/i-pipeline-conversation-question-query';

class PostgreSqlPipelineConversationQuestionQuery
  implements IPipelineConversationQuestionQuery
{
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async getNextQuestionId({
    pipelineConversationId,
  }: GetNextQuestionIdInput): Promise<string | null> {
    const [pipelineConversationQuestion] = await this.databaseConfig.query(
      `SELECT
        id
      FROM
        pipeline_conversation_questions
      WHERE
        pipeline_conversation_id = $1
        AND answered = false
        AND deleted_at IS NULL
      ORDER BY created_at
      LIMIT 1`,
      [pipelineConversationId],
    );

    return pipelineConversationQuestion
      ? pipelineConversationQuestion.id
      : null;
  }
}

export default PostgreSqlPipelineConversationQuestionQuery;
