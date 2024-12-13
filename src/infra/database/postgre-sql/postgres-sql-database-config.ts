import { IDatabaseConfig } from '@/application/database/i-database-config';
import { env } from '@/main';
import pgPromise, { IDatabase } from 'pg-promise';

class PostgreSqlDatabaseConfig implements IDatabaseConfig {
  private client: IDatabase<any>;
  private transactionStarted: boolean = false;

  constructor() {
    this.client = pgPromise()({
      connectionString: env.DATABASE_URL,
    });

    if (env.DATABASE_LOG) {
      this.client.$config.options.query = e => {
        console.log('QUERY RUNNED:', e.query);
      };
    }
  }

  public async query(query: string, params: any[]): Promise<any> {
    return this.client.query(query, params);
  }

  public async close(): Promise<void> {
    await this.client.$pool.end();
  }

  public async startTransaction(): Promise<void> {
    if (!this.transactionStarted) {
      this.transactionStarted = true;
      await this.client.none('BEGIN');
    }
  }

  public async commit(): Promise<void> {
    if (this.transactionStarted) {
      this.transactionStarted = false;
      await this.client.none('COMMIT');
    }
  }

  public async rollback(): Promise<void> {
    if (this.transactionStarted) {
      this.transactionStarted = false;
      await this.client.none('ROLLBACK');
    }
  }
}

export default PostgreSqlDatabaseConfig;
