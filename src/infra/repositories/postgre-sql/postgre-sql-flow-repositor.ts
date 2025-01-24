import { IDatabaseConfig } from '@/application/database/i-database-config';
import {
  FindFlowByIdInput,
  IFlowRepository,
} from '@/application/repositories/i-flow-repository';
import Flow from '@/domain/entities/flow';

class PostgreSqlFlowRepository implements IFlowRepository {
  constructor(private readonly databaseConfig: IDatabaseConfig) {}

  public async findById({ id }: FindFlowByIdInput): Promise<Flow | null> {
    const [flow] = await this.databaseConfig.query(
      `SELECT
        id,
        name,
        type,
        max_iter AS "maxIter",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM
        flows
      WHERE
        id = $1
        AND deleted_at IS NULL
      LIMIT 1
      `,
      [id],
    );

    return flow ? Flow.create(flow) : null;
  }
}

export default PostgreSqlFlowRepository;
