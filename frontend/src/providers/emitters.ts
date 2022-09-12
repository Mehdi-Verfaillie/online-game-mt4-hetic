import { Socket } from 'socket.io-client';

export const emitters = (socket: Socket) => {
  return {
    createRoom: name => socket.emit('create:room', { name }),
    joinRoom: (name, roomId) => socket.emit('join:room', { name, room: roomId }),
  };
};
