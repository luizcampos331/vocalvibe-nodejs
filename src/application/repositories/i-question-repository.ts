import Question from '@/domain/entities/question';

export interface IQuestionRepository {
  list(): Promise<Question[]>;
  findById(data: FindQuestionByIdInput): Promise<Question | null>;
  create(question: Question): Promise<void>;
}

export type FindQuestionByIdInput = {
  id: string;
};
