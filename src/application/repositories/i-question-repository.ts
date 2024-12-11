import Question from '@/domain/entities/question';

export interface IQuestionRepository {
  create(question: Question): Promise<void>;
}
