import { IDatabaseConfig } from '@/application/database/i-database-config';
import {
  FindPipelineConvertionQuestionByIdInput,
  IPipelineConversationQuestionRepository,
} from '@/application/repositories/i-pipeline-conversation-question-respository';
import PipelineConversationQuestion from '@/domain/entities/pipeline-conversation-question';

class PostgreSqlPipelineConversationQuestionRepository
  implements IPipelineConversationQuestionRepository
{
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async findById({
    id,
  }: FindPipelineConvertionQuestionByIdInput): Promise<PipelineConversationQuestion | null> {
    const [pipelineConversationQuestion] = await this.databaseConfig.query(
      `SELECT
        id,
        pipeline_conversation_id AS "pipelineConversationId",
        question_id AS "questionId",
        answered,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM
        pipeline_conversation_questions
      WHERE
        id = $1
        AND deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return pipelineConversationQuestion
      ? PipelineConversationQuestion.create(pipelineConversationQuestion)
      : null;
  }

  public async create(data: PipelineConversationQuestion): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO pipeline_conversation_questions (id, pipeline_conversation_id, question_id, answered, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        dataJson.id,
        dataJson.pipelineConversationId,
        dataJson.questionId,
        dataJson.answered,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }

  public async update(data: PipelineConversationQuestion): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      `UPDATE pipeline_conversation_questions
         SET pipeline_conversation_id = $1,
             question_id = $2,
             answered = $3,
             created_at = $4,
             updated_at = $5
         WHERE id = $6 AND deleted_at IS NULL`,
      [
        dataJson.pipelineConversationId,
        dataJson.questionId,
        dataJson.answered,
        dataJson.createdAt,
        dataJson.updatedAt,
        dataJson.id,
      ],
    );
  }
}

export default PostgreSqlPipelineConversationQuestionRepository;
