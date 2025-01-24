import { IDatabaseConfig } from '@/application/database/i-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlFlowRepository from '@/infra/repositories/postgre-sql/postgre-sql-flow-repositor';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlFlowRepository(databaseConfig),
};

class FlowRepositoryFactory {
  public make(databaseConfig: IDatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid database implementation - flow');
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default FlowRepositoryFactory;
