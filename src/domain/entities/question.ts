import Entity, { EntityJSON, EntityProps } from './entity';

export type QuestionProps = EntityProps & {
  context: string;
  nativeLanguage: string;
  goalLanguage: string;
  filename: string;
  duration: number;
};

export type QuestionJSON = QuestionProps & EntityJSON;

class Question extends Entity {
  private readonly _context: string;
  private readonly _nativeLanguage: string;
  private readonly _goalLanguage: string;
  private readonly _filename: string;
  private readonly _duration: number;

  constructor(props: QuestionProps) {
    super(props);
    this._context = props.context;
    this._nativeLanguage = props.nativeLanguage;
    this._goalLanguage = props.goalLanguage;
    this._filename = props.filename;
    this._duration = props.duration;
  }

  public get goalLanguage() {
    return this._goalLanguage;
  }

  public get filename() {
    return this._filename;
  }

  public static create(props: QuestionProps): Question {
    return new Question(props);
  }

  public toJSON(): QuestionJSON {
    return {
      id: this._id,
      context: this._context,
      nativeLanguage: this._nativeLanguage,
      goalLanguage: this._goalLanguage,
      filename: this._filename,
      duration: this._duration,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}

export default Question;
