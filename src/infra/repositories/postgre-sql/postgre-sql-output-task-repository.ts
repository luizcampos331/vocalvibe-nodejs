import { IDatabaseConfig } from '@/application/database/i-database-config';
import { IOutputTaskRepository } from '@/application/repositories/i-output-task-repository';
import OutputTask from '@/domain/entities/output-task';

class PostgreSqlOutputTaskRepository implements IOutputTaskRepository {
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async create(data: OutputTask): Promise<void> {
    const dataJson = data.toJSON();
    await this.databaseConfig.query(
      'INSERT INTO output_tasks (id, flow_id, task_id, output, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        dataJson.id,
        dataJson.flowId,
        dataJson.taskId,
        dataJson.output,
        dataJson.createdAt,
        dataJson.updatedAt,
      ],
    );
  }
}

export default PostgreSqlOutputTaskRepository;
