import { IDatabaseConfig } from '@/application/database/i-database-config';
import DatabaseConfig from '@/infra/database/postgre-sql/postgres-sql-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlPipelineConversationAnswerRepository from '@/infra/repositories/postgre-sql/postgre-sql-pipeline-conversarion-answer-repository';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlPipelineConversationAnswerRepository(databaseConfig),
};

class PipelineConversationAnswerRepositoryFactory {
  public make(databaseConfig: DatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - pipeline conversation answer',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default PipelineConversationAnswerRepositoryFactory;
