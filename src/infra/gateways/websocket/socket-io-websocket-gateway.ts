import {
  EmitWebsocketInput,
  IWebsocketGateway,
} from '@/application/gateways/i-websocket-gateway';
import { Server } from 'node:http';
import { Server as SocketServer } from 'socket.io';

class SocketIoWebsocketGateway implements IWebsocketGateway {
  private socketServer!: SocketServer;

  public start(server: Server) {
    this.socketServer = new SocketServer(server, {
      cors: {
        origin: '*',
      },
    });

    this.socketServer.on('connection', socketProps => {
      socketProps.on('connectUser', data => {
        socketProps.join(data.room);
      });

      socketProps.on('disconnectUser', data => {
        socketProps.leave(data.room);
      });
    });

    return this.socketServer;
  }

  public async emit({ room, event, data }: EmitWebsocketInput): Promise<void> {
    this.socketServer.to(room).emit(event, data);
  }
}

export default SocketIoWebsocketGateway;
