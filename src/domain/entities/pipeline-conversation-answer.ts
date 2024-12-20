import Entity, { EntityJSON, EntityProps } from './entity';

export type PipelineConversationAnswerProps = EntityProps & {
  pipelineConversationQuestionId: string;
  filename: string;
};

export type PipelineConversationAnswerJSON = PipelineConversationAnswerProps &
  EntityJSON;

class PipelineConversationAnswer extends Entity {
  private readonly _pipelineConversationQuestionId: string;
  private readonly _filename: string;

  constructor(props: PipelineConversationAnswerProps) {
    super(props);
    this._pipelineConversationQuestionId = props.pipelineConversationQuestionId;
    this._filename = props.filename;
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
      filename: this.filename,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default PipelineConversationAnswer;
