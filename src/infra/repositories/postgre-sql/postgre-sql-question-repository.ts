import { IDatabaseConfig } from '@/application/database/i-database-config';
import {
  FindQuestionByIdInput,
  IQuestionRepository,
} from '@/application/repositories/i-question-repository';
import Question from '@/domain/entities/question';

class PostgreSqlQuestionRepository implements IQuestionRepository {
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async list(): Promise<Question[]> {
    const questions = await this.databaseConfig.query(
      `SELECT
        id,
        context,
        native_language AS "nativeLanguage",
        goal_language AS "goalLanguage",
        filename,
        created_at,
        updated_at
      FROM questions;`,
      [],
    );

    return questions.map((question: any) => Question.create(question));
  }

  public async findById({
    id,
  }: FindQuestionByIdInput): Promise<Question | null> {
    const [question] = await this.databaseConfig.query(
      `SELECT
        id,
        context,
        native_language AS "nativeLanguage",
        goal_language AS "goalLanguage",
        filename,
        created_at,
        updated_at
      FROM
        questions
      WHERE
        id = $1
        AND deleted_at IS NULL;`,
      [id],
    );

    return question ? Question.create(question) : null;
  }

  public async create(data: Question): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO questions (id, context, native_language, goal_language, filename, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        dataJson.id,
        dataJson.context,
        dataJson.nativeLanguage,
        dataJson.goalLanguage,
        dataJson.filename,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlQuestionRepository;
