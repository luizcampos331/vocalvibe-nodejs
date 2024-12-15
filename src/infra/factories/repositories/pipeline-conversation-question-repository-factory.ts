import { IDatabaseConfig } from '@/application/database/i-database-config';
import DatabaseConfig from '@/infra/database/postgre-sql/postgres-sql-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlPipelineConversationQuestionRepository from '@/infra/repositories/postgre-sql/postgre-sql-pipeline-conversarion-question-repository';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlPipelineConversationQuestionRepository(databaseConfig),
};

class PipelineConversationQuestionRepositoryFactory {
  public make(databaseConfig: DatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - pipeline conversation question',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default PipelineConversationQuestionRepositoryFactory;
