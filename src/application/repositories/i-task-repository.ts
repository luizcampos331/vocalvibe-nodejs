import Task from '@/domain/entities/task';

export interface ITaskRepository {
  findById(data: FindTaskByIdInput): Promise<Task | null>;
}

export type FindTaskByIdInput = {
  id: string;
};
