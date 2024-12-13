import { IDatabaseConfig } from '@/application/database/i-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlLlmTokensRepository from '@/infra/repositories/postgre-sql/postgre-sql-llm-tokens-repository';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlLlmTokensRepository(databaseConfig),
};

class LlmTokensRepositoryFactory {
  public make(databaseConfig: IDatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - question',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default LlmTokensRepositoryFactory;
