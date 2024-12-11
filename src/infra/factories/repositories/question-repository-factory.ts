import DatabaseConfig from '@/infra/database/postgre-sql/database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlQuestionRepository from '@/infra/repositories/postgre-sql/postgre-sql-question-repository';
import { env } from '@/main';

class QuestionRepositoryFactory {
  public postgresSql(databaseConfig: DatabaseConfig) {
    return new PostgreSqlQuestionRepository(databaseConfig);
  }

  public create(databaseConfig: DatabaseConfig) {
    if (!Object.keys(this).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - question',
      );
    }
    return this[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default QuestionRepositoryFactory;
