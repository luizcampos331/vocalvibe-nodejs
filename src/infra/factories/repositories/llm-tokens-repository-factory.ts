import DatabaseConfig from '@/infra/database/postgre-sql/database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlLlmTokensRepository from '@/infra/repositories/postgre-sql/postgre-sql-llm-tokens-repository';
import { env } from '@/main';

class LlmTokensRepositoryFactory {
  public postgresSql(databaseConfig: DatabaseConfig) {
    return new PostgreSqlLlmTokensRepository(databaseConfig);
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

export default LlmTokensRepositoryFactory;
