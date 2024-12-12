import { IDatabaseConfig } from '@/application/database/i-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlLlmTokensRepository from '@/infra/repositories/postgre-sql/postgre-sql-llm-tokens-repository';
import { env } from '@/main';

class LlmTokensRepositoryFactory {
  public postgreSql(databaseConfig: IDatabaseConfig) {
    return new PostgreSqlLlmTokensRepository(databaseConfig);
  }

  public make(databaseConfig: IDatabaseConfig) {
    if (!Object.keys(this).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - question',
      );
    }
    return this[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default LlmTokensRepositoryFactory;
