import { IDatabaseConfig } from '@/application/database/i-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlOutputTaskRepository from '@/infra/repositories/postgre-sql/postgre-sql-output-task-repository';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlOutputTaskRepository(databaseConfig),
};

class OutputTaskRepositoryFactory {
  public make(databaseConfig: IDatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - output task',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default OutputTaskRepositoryFactory;
