import Entity, { EntityJSON, EntityProps } from './entity';

export type OutputTaskProps = EntityProps & {
  flowId: string;
  taskId: string;
  output: string;
};

export type OutputTaskJSON = OutputTaskProps & EntityJSON;

class OutputTask extends Entity {
  private readonly _flowId: string;
  private readonly _taskId: string;
  private readonly _output: string;

  constructor(props: OutputTaskProps) {
    super(props);
    this._flowId = props.flowId;
    this._taskId = props.taskId;
    this._output = props.output;
  }

  public static create(props: OutputTaskProps): OutputTask {
    return new OutputTask(props);
  }

  public toJSON(): OutputTaskJSON {
    return {
      id: this._id,
      flowId: this._flowId,
      taskId: this._taskId,
      output: this._output,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default OutputTask;
