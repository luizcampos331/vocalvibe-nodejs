import Question from '@/domain/entities/question';

export interface IQuestionRepository {
  findAll(): Promise<Question[]>;
  create(question: Question): Promise<void>;
}
