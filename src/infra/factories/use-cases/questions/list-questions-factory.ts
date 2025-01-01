import ListQuestionsUseCase from '@/application/use-cases/questions/list-questions-use-case';
import DatabaseFactory from '../../database/database-factory';
import QuestionRepositoryFactory from '../../repositories/question-repository-factory';

class ListQuestionsFactory {
  public make() {
    const databaseConfig = new DatabaseFactory().make();
    return new ListQuestionsUseCase(
      new QuestionRepositoryFactory().make(databaseConfig),
    );
  }
}

export default ListQuestionsFactory;
