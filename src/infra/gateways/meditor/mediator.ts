import {
  ConsumeMediatorInput,
  IMediator,
  NotifyMediatorInput,
} from '@/application/gateways/i-mediator';

class Mediator implements IMediator {
  private static instance: Mediator;
  public handlers: ConsumeMediatorInput[];

  private constructor() {
    this.handlers = [];
  }

  public static getInstance() {
    if (!Mediator.instance) {
      Mediator.instance = new Mediator();
    }
    return Mediator.instance;
  }

  public consume({ event, callback }: ConsumeMediatorInput): void {
    this.handlers.push({ event, callback });
  }

  public async notify<T>({
    event,
    data,
  }: NotifyMediatorInput<T>): Promise<void> {
    for (const handler of this.handlers) {
      if (handler.event === event) {
        await handler.callback(data).catch(error => {
          console.error(error);
        });
      }
    }
  }
}

export default Mediator;
