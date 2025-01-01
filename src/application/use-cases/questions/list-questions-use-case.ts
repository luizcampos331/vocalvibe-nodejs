import { IQuestionRepository } from '@/application/repositories/i-question-repository';
import { ExceptionError } from '@/shared/errors/exception-error';
import { HandleError } from '@/shared/errors/handle-error';

type ListQuestionsOutput = {
  questions: {
    context: string;
    question: string;
  }[];
};

class ListQuestionsUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  public async execute(): Promise<ListQuestionsOutput> {
    try {
      const questions = await this.questionRepository.list();

      return {
        questions: questions.map(question => ({
          context: question.context,
          question: question.goalLanguage,
        })),
      };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new ExceptionError('Create question from audio error', error);
    }
  }
}

export default ListQuestionsUseCase;
