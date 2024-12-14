import Entity, { EntityJSON, EntityProps } from './entity';

export type QuestionProps = EntityProps & {
  createdBy: string;
  context: string;
  content: string;
  filename: string;
  duration: number;
};

export type QuestionJSON = QuestionProps & EntityJSON;

class Question extends Entity {
  private readonly _createdBy: string;
  private readonly _context: string;
  private readonly _content: string;
  private readonly _filename: string;
  private readonly _duration: number;

  constructor(props: QuestionProps) {
    super(props);
    this._createdBy = props.createdBy;
    this._context = props.context;
    this._content = props.content;
    this._filename = props.filename;
    this._duration = props.duration;
  }

  public static create(props: QuestionProps): Question {
    return new Question(props);
  }

  public toJSON(): QuestionJSON {
    return {
      id: this._id,
      createdBy: this._createdBy,
      context: this._context,
      content: this._content,
      filename: this._filename,
      duration: this._duration,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default Question;
