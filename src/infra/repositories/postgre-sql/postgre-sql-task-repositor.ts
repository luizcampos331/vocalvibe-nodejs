import { IDatabaseConfig } from '@/application/database/i-database-config';
import {
  FindTaskByIdInput,
  ITaskRepository,
} from '@/application/repositories/i-task-repository';
import Task from '@/domain/entities/task';

class PostgreSqlTaskRepository implements ITaskRepository {
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async findById({ id }: FindTaskByIdInput): Promise<Task | null> {
    const [task] = await this.databaseConfig.query(
      `SELECT
        id,
        flow_id AS "flowId",
        agent_id AS "agentId",
        name,
        description,
        expected_output AS "expectedOutput",
        order_task AS "orderTask",
        async_execution AS "asyncExecution",
        tasks_dependency AS "tasksDependency",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM
        tasks
      WHERE
        id = $1
        AND deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return task ? Task.create(task) : null;
  }
}

export default PostgreSqlTaskRepository;
