import { IDatabaseConfig } from '@/application/database/i-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import PostgreSqlTaskRepository from '@/infra/repositories/postgre-sql/postgre-sql-task-repositor';
import { env } from '@/main';

const implementations = {
  postgreSQL: (databaseConfig: IDatabaseConfig) =>
    new PostgreSqlTaskRepository(databaseConfig),
};

class TaskRepositoryFactory {
  public make(databaseConfig: IDatabaseConfig) {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid database implementation - task');
    }
    return implementations[env.DATABASE_IMPLEMENTATION](databaseConfig);
  }
}

export default TaskRepositoryFactory;
