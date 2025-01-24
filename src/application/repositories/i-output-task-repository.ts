import OutputTask from '@/domain/entities/output-task';

export interface IOutputTaskRepository {
  create(data: OutputTask): Promise<void>;
}
