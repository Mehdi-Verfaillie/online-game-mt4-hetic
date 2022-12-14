import { Socket } from 'socket.io-client';

export const emitters = (socket: Socket) => {
  return {
    createRoom: name => socket.emit('create:room', { name }),
    joinRoom: (name, roomId) => socket.emit('join:room', { name, room: roomId }),
    startGame: () => socket.emit('start:game'),
    endCountdown: () => socket.emit('end:countdown'),
    tryAnswer: value => socket.emit('try:answer', { word: value }),
  };
};
