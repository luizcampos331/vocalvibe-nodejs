import PostgreSqlDatabaseConfig from '@/infra/database/postgre-sql/postgres-sql-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import { env } from '@/main';

const implementations = {
  postgreSql: new PostgreSqlDatabaseConfig(),
};

class DatabaseFactory {
  public make() {
    if (!Object.keys(this).includes(env.DATABASE_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid database implementation - postgreSQL',
      );
    }
    return implementations[env.DATABASE_IMPLEMENTATION];
  }
}

export default DatabaseFactory;
