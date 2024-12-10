import { UniqueID } from '../value-object/unique-id';

export type EntityProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export type EntityJSON = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

abstract class Entity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  protected _deletedAt: Date | null;

  protected constructor(props: EntityProps) {
    const now = new Date();

    this._id = props?.id ?? new UniqueID().getValue();
    this._createdAt = props?.createdAt || now;
    this._updatedAt = props?.updatedAt || now;
    this._deletedAt = props?.deletedAt || null;
  }

  public get id() {
    return this._id;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public get deletedAt() {
    return this._deletedAt;
  }

  protected setUpdatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  protected setDeletedAt(deletedAt: Date) {
    this._deletedAt = deletedAt;
    this.setUpdatedAt(new Date());
  }
}

export default Entity;
