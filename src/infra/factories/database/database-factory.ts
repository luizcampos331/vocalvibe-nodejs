import PostgreSqlDatabaseConfig from '@/infra/database/postgre-sql/postgres-sql-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import { env } from '@/main';

const implementations = {
  postgreSQL: new PostgreSqlDatabaseConfig(),
};

class DatabaseFactory {
  public make() {
    if (!Object.keys(implementations).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - postgreSQL',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION];
  }
}

export default DatabaseFactory;
