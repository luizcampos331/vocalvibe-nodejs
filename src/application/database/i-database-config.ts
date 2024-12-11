export interface IDatabaseConfig {
  query(query: string, params: any[]): Promise<any>;
  close(): Promise<void>;
  startTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
