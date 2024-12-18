export interface IWebsocketGateway {
  emit(data: EmitWebsocketInput): Promise<void>;
}

export type EmitWebsocketInput = {
  room: string;
  event: string;
  data: any;
};
