import { DomainError } from '../errors/domain-error';
import Entity, { EntityJSON, EntityProps } from './entity';

export enum PipelineConversationStatus {
  create,
  inProgress,
  finished,
  failed,
}

export type PipelineConversationProps = EntityProps & {
  status: PipelineConversationStatus;
};

export type PipelineConversationJSON = PipelineConversationProps & EntityJSON;

class PipelineConversation extends Entity {
  private _status: PipelineConversationStatus;

  constructor(props: PipelineConversationProps) {
    super(props);
    this._status = props.status;
  }

  public static create(props: PipelineConversationProps): PipelineConversation {
    return new PipelineConversation(props);
  }

  public toJSON(): PipelineConversationJSON {
    return {
      id: this._id,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }

  public start() {
    if (this._status !== PipelineConversationStatus.create) {
      throw new DomainError(
        'Invalid status for pipeline conversation to be initiated',
      );
    }
    this._status = PipelineConversationStatus.inProgress;
    this.setUpdatedAt();
  }
}

export default PipelineConversation;
