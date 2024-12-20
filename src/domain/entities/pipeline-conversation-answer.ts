import Entity, { EntityJSON, EntityProps } from './entity';

export type PipelineConversationAnswerProps = EntityProps & {
  pipelineConversationQuestionId: string;
  text: string;
  filename: string;
  duration: number;
};

export type PipelineConversationAnswerJSON = PipelineConversationAnswerProps &
  EntityJSON;

class PipelineConversationAnswer extends Entity {
  private readonly _pipelineConversationQuestionId: string;
  private readonly _text: string;
  private readonly _filename: string;
  private readonly _duration: number;

  constructor(props: PipelineConversationAnswerProps) {
    super(props);
    this._pipelineConversationQuestionId = props.pipelineConversationQuestionId;
    this._text = props.text;
    this._filename = props.filename;
    this._duration = props.duration;
  }

  public get filename() {
    return this._filename;
  }

  public static create(
    props: PipelineConversationAnswerProps,
  ): PipelineConversationAnswer {
    return new PipelineConversationAnswer(props);
  }

  public toJSON(): PipelineConversationAnswerJSON {
    return {
      id: this._id,
      pipelineConversationQuestionId: this._pipelineConversationQuestionId,
      text: this._text,
      filename: this.filename,
      duration: this._duration,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default PipelineConversationAnswer;
