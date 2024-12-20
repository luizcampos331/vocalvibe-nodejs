export interface IWebsocketGateway {
  emit(data: EmitWebsocketInput): Promise<void>;
  listen(data: ListenWebsocketInput): Promise<void>;
}

export type EmitWebsocketInput = {
  room: string;
  event: string;
  data: any;
};

export type ListenWebsocketInput = {
  event: string;
  room: string;
  callback: (data: any) => void;
};
