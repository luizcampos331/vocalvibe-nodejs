export interface IMediator {
  consume(data: ConsumeMediatorInput): void;
  notify<T>(data: NotifyMediatorInput<T>): Promise<void>;
}

export type ConsumeMediatorInput = {
  event: string;
  callback: (data: any) => Promise<void>;
};

export type NotifyMediatorInput<T> = {
  event: string;
  data: T;
};
