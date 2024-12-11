import { IQuestionRepository } from '@/application/repositories/i-question-repository';
import Question from '@/domain/entities/question';
import DatabaseConfig from '@/infra/database/postgre-sql/database-config';

class PostgreSqlQuestionRepository implements IQuestionRepository {
  constructor(private readonly databaseConfig: DatabaseConfig) {}

  public async create(data: Question): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO question (id, created_by, context, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        dataJson.id,
        dataJson.createdBy,
        dataJson.context,
        dataJson.content,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlQuestionRepository;
