import Flow from '@/domain/entities/flow';

export interface IFlowRepository {
  findById(data: FindFlowByIdInput): Promise<Flow | null>;
}

export type FindFlowByIdInput = {
  id: string;
};
