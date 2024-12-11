import { IDatabaseConfig } from '@/application/database/i-database-config';
import { env } from '@/main';
import pgPromise, { IDatabase } from 'pg-promise';

class DatabaseConfig implements IDatabaseConfig {
  private client: IDatabase<any>;
  private transactionStarted: boolean = false;

  constructor() {
    this.client = pgPromise()({
      connectionString: env.DATABASE_URL,
    });
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
      await this.client.one('BEGIN');
    }
  }

  public async commit(): Promise<void> {
    if (this.transactionStarted) {
      this.transactionStarted = false;
      await this.client.one('COMMIT');
    }
  }

  public async rollback(): Promise<void> {
    if (this.transactionStarted) {
      this.transactionStarted = false;
      await this.client.one('ROLLBACK');
    }
  }
}

export default DatabaseConfig;
