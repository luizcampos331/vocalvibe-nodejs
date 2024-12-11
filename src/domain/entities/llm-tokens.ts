import Entity, { EntityJSON, EntityProps } from './entity';

export enum LlmTokensEntity {
  question,
}

export type LlmTokensProps = EntityProps & {
  entityId: string;
  inputTokens: number;
  outputTokens: number;
  entity: LlmTokensEntity;
};

export type LlmTokensJSON = LlmTokensProps & EntityJSON;

class LlmTokens extends Entity {
  private readonly _entityId: string;
  private readonly _inputTokens: number;
  private readonly _outputTokens: number;
  private readonly _entity: LlmTokensEntity;

  constructor(props: LlmTokensProps) {
    super(props);
    this._entityId = props.entityId;
    this._inputTokens = props.inputTokens;
    this._outputTokens = props.outputTokens;
    this._entity = props.entity;
  }

  public static create(props: LlmTokensProps): LlmTokens {
    return new LlmTokens(props);
  }

  public toJSON(): LlmTokensJSON {
    return {
      id: this._id,
      entityId: this._entityId,
      inputTokens: this._inputTokens,
      outputTokens: this._outputTokens,
      createdAt: this._createdAt,
      entity: this._entity,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default LlmTokens;
