import {
  EmitWebsocketInput,
  IWebsocketGateway,
  ListenWebsocketInput,
} from '@/application/gateways/i-websocket-gateway';
import { Server } from 'node:http';
import { Server as SocketServer, Socket } from 'socket.io';

class SocketIoWebsocketGateway implements IWebsocketGateway {
  private socketServer!: SocketServer;
  private socketProps!: Socket;

  public start(server: Server) {
    this.socketServer = new SocketServer(server, {
      cors: {
        origin: '*',
      },
    });

    this.socketServer.on('connection', socketProps => {
      socketProps.on('connect-user', data => {
        socketProps.join(data.room);
      });

      socketProps.on('disconnect-user', data => {
        socketProps.leave(data.room);
      });

      this.socketProps = socketProps;
    });

    return this.socketServer;
  }

  public async emit({ room, event, data }: EmitWebsocketInput): Promise<void> {
    this.socketServer.to(room).emit(event, data);
  }

  public async listen({
    room,
    event,
    callback,
  }: ListenWebsocketInput): Promise<void> {
    this.socketServer.on('connection', socketProps => {
      this.socketProps.on(event, data => {
        if (!socketProps.rooms.has(room)) {
          return;
        }
        callback(data);
      });
    });
  }
}

export default SocketIoWebsocketGateway;
