import { ApplicationError } from '@/application/errors/application-error';
import { IFlowRepository } from '@/application/repositories/i-flow-repository';
import { IOutputTaskRepository } from '@/application/repositories/i-output-task-repository';
import { ITaskRepository } from '@/application/repositories/i-task-repository';
import OutputTask from '@/domain/entities/output-task';
import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';

export type CreateOutputTaskUseCaseInput = {
  flowId: string;
  taskId: string;
  output: string;
};

class CreateOutputTaskUseCase {
  constructor(
    private readonly flowRepository: IFlowRepository,
    private readonly taskRepository: ITaskRepository,
    private readonly outputTaskRepository: IOutputTaskRepository,
  ) {}

  public async execute({
    flowId,
    taskId,
    output,
  }: CreateOutputTaskUseCaseInput): Promise<void> {
    try {
      const flow = await this.flowRepository.findById({
        id: flowId,
      });

      if (!flow) {
        throw new ApplicationError('Flow not found');
      }

      const task = await this.taskRepository.findById({
        id: taskId,
      });

      if (!task) {
        throw new ApplicationError('Flow not found');
      }

      await this.outputTaskRepository.create(
        OutputTask.create({
          flowId,
          taskId,
          output,
        }),
      );
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new ExceptionError('Create output task error', error);
    }
  }
}

export default CreateOutputTaskUseCase;
