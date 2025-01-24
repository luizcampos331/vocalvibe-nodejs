import Entity, { EntityJSON, EntityProps } from './entity';

export type TaskProps = EntityProps & {
  flowId: string;
  agentId: string;
  name: string;
  description: string;
  expectedOutput: string;
  orderTask: number;
  asyncExecution: boolean;
  tasksDependency: string[];
};

export type TaskJSON = TaskProps & EntityJSON;

class Task extends Entity {
  private readonly _flowId: string;
  private readonly _agentId: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _expectedOutput: string;
  private readonly _orderTask: number;
  private readonly _asyncExecution: boolean;
  private readonly _tasksDependency: string[];

  constructor(props: TaskProps) {
    super(props);
    this._flowId = props.flowId;
    this._agentId = props.agentId;
    this._name = props.name;
    this._description = props.description;
    this._expectedOutput = props.expectedOutput;
    this._orderTask = props.orderTask;
    this._asyncExecution = props.asyncExecution;
    this._tasksDependency = props.tasksDependency;
  }

  public static create(props: TaskProps): Task {
    return new Task(props);
  }

  public toJSON(): TaskJSON {
    return {
      id: this._id,
      flowId: this._flowId,
      agentId: this._agentId,
      name: this._name,
      description: this._description,
      orderTask: this._orderTask,
      expectedOutput: this._expectedOutput,
      asyncExecution: this._asyncExecution,
      tasksDependency: this._tasksDependency,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default Task;
