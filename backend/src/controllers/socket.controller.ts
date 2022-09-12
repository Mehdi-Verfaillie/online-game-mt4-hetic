import { Socket } from 'socket.io';

/*
  |--------------------------------------------------------------------------
  | SocketController
  |--------------------------------------------------------------------------
  |
  | The purpose of this controller is to provide informations about the
  | socket itself.
  |
  | No business logic should be added here.
*/
export default class SocketController {
  private isConnected: boolean;

  public get connectionStatus() {
    return this.isConnected;
  }

  public connection(socket: Socket) {
    console.log(`Connection status: ${socket.connected ? 'connected' : 'disconnected'} as ${socket.id}`);
    this.isConnected = socket.connected;

    socket.emit('connection:success', { id: socket.id });
  }
}
