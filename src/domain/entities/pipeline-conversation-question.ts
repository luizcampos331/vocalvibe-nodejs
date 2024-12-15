import Entity, { EntityJSON, EntityProps } from './entity';

export type PipelineConversationQuestionProps = EntityProps & {
  pipelineConversationId: string;
  question: string;
  filename: string;
};

export type PipelineConversationQuestionJSON =
  PipelineConversationQuestionProps & EntityJSON;

class PipelineConversationQuestion extends Entity {
  private readonly _pipelineConversationId: string;
  private readonly _question: string;
  private readonly _filename: string;

  constructor(props: PipelineConversationQuestionProps) {
    super(props);
    this._pipelineConversationId = props.pipelineConversationId;
    this._question = props.question;
    this._filename = props.filename;
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
      question: this._question,
      filename: this._filename,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default PipelineConversationQuestion;
