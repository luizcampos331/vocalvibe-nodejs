import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import SocketIoWebsocketGateway from '@/infra/gateways/websocket/socket-io-websocket-gateway';
import { env } from '@/main';

const implementations = {
  socketIo: new SocketIoWebsocketGateway(),
};

class WebsocketGatewayFactory {
  public make() {
    if (!Object.keys(implementations).includes(env.WEBSOCKET_IMPLEMENTATION)) {
      throw new InfrastructureError(
        'Invalid gateway implementation - websocket',
      );
    }
    return implementations[env.WEBSOCKET_IMPLEMENTATION];
  }
}

export default WebsocketGatewayFactory;
