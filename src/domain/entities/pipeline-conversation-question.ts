import Entity, { EntityJSON, EntityProps } from './entity';

export type PipelineConversationQuestionProps = EntityProps & {
  pipelineConversationId: string;
  questionId: string;
  answered?: boolean;
};

export type PipelineConversationQuestionJSON =
  PipelineConversationQuestionProps & EntityJSON;

class PipelineConversationQuestion extends Entity {
  private readonly _pipelineConversationId: string;
  private readonly _questionId: string;
  private readonly _answered: boolean;

  constructor(props: PipelineConversationQuestionProps) {
    super(props);
    this._pipelineConversationId = props.pipelineConversationId;
    this._questionId = props.questionId;
    this._answered = props?.answered || false;
  }

  public get questionId() {
    return this._questionId;
  }

  public static create(
    props: PipelineConversationQuestionProps,
  ): PipelineConversationQuestion {
    return new PipelineConversationQuestion(props);
  }

  public toJSON(): PipelineConversationQuestionJSON {
    return {
      id: this._id,
      pipelineConversationId: this._pipelineConversationId,
      questionId: this._questionId,
      answered: this._answered,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default PipelineConversationQuestion;
