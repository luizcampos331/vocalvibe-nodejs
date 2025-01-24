import CreateOutputTaskUseCase from '@/application/use-cases/flow-ai-agents/create-output-task-use-case';
import DatabaseFactory from '../../database/database-factory';
import FlowRepositoryFactory from '../../repositories/flow-repository-factory';
import TaskRepositoryFactory from '../../repositories/task-repository-factory';
import OutputTaskRepositoryFactory from '../../repositories/output-task-repository-factory';

class CreateOutputTaskFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new CreateOutputTaskUseCase(
      new FlowRepositoryFactory().make(databaseConfig),
      new TaskRepositoryFactory().make(databaseConfig),
      new OutputTaskRepositoryFactory().make(databaseConfig),
    );
  }
}

export default CreateOutputTaskFactory;
