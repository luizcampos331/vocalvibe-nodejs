import { randomUUID } from 'node:crypto';

export class UniqueID {
  private value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  getValue() {
    return this.value;
  }
}
