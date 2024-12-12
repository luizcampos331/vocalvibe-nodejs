import { IDatabaseConfig } from '@/application/database/i-database-config';
import { IQuestionRepository } from '@/application/repositories/i-question-repository';
import Question from '@/domain/entities/question';

class PostgreSqlQuestionRepository implements IQuestionRepository {
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async create(data: Question): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO question (id, created_by, context, content, duration, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        dataJson.id,
        dataJson.createdBy,
        dataJson.context,
        dataJson.content,
        dataJson.duration,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlQuestionRepository;
