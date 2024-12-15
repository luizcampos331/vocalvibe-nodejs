import Entity, { EntityJSON, EntityProps } from './entity';

export enum PipelineConversationStatus {
  create,
  inProgress,
  finished,
  failed,
}

export type PipelineConversationProps = EntityProps & {
  createdBy: string;
  status: PipelineConversationStatus;
};

export type PipelineConversationJSON = PipelineConversationProps & EntityJSON;

class PipelineConversation extends Entity {
  private readonly _createdBy: string;
  private readonly _status: PipelineConversationStatus;

  constructor(props: PipelineConversationProps) {
    super(props);
    this._createdBy = props.createdBy;
    this._status = props.status;
  }

  public static create(props: PipelineConversationProps): PipelineConversation {
    return new PipelineConversation(props);
  }

  public toJSON(): PipelineConversationJSON {
    return {
      id: this._id,
      createdBy: this._createdBy,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default PipelineConversation;
