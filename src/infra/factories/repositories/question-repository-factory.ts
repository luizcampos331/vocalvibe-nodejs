import { IDatabaseConfig } from '@/application/database/i-database-config';
import DatabaseConfig from '@/infra/database/postgre-sql/postgres-sql-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlQuestionRepository from '@/infra/repositories/postgre-sql/postgre-sql-question-repository';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlQuestionRepository(databaseConfig),
};

class QuestionRepositoryFactory {
  public make(databaseConfig: DatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - question',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default QuestionRepositoryFactory;
