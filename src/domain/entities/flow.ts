import Entity, { EntityJSON, EntityProps } from './entity';

export enum FlowType {
  questionsPlan,
  evaluation,
}

export type FlowProps = EntityProps & {
  name: string;
  type: FlowType;
  maxIter: number;
};

export type FlowJSON = FlowProps & EntityJSON;

class Flow extends Entity {
  private readonly _name: string;
  private readonly _type: FlowType;
  private readonly _maxIter: number;

  constructor(props: FlowProps) {
    super(props);
    this._name = props.name;
    this._type = props.type;
    this._maxIter = props.maxIter;
  }

  public static create(props: FlowProps): Flow {
    return new Flow(props);
  }

  public toJSON(): FlowJSON {
    return {
      id: this._id,
      name: this._name,
      type: this._type,
      maxIter: this._maxIter,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default Flow;
