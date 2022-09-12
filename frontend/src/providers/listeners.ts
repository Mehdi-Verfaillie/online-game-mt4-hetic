/* eslint-disable prettier/prettier */
import { Socket } from 'socket.io-client';

export const listeners = (socket: Socket) => {
  return {
    onCreateRoom: {
      success: (context, navigate: () => void) => {
        socket.on('create:room:success', ({ players, roomId }) => {
          context.dispatch({ type: 'SET_PLAYERS', value: players });

          navigate(`/${roomId}`);
        });
      },
      error: () => {
        socket.on('create:room:error', ({ message }) => {
          console.log(message);
        });
      },
    },

    onJoinRoom: {
      success: context => {
        socket.on('join:room:success', ({ players }) => {
          context.dispatch({ type: 'SET_PLAYERS', value: players });
        });
      },
      error: () => {
        socket.on('join:room:error', ({ message }) => {
          console.log(message);
        });
      },
    },

    onStartGame: {
      success: context => {
        socket.on('start:game:success', ({ hint, countdown }) => {
          context.dispatch({ type: 'SET_GAME_HINT', value: hint });
          context.dispatch({ type: 'SET_GAME_STATUS', value: 'ongoing' });
        });
      },
      error: () => {
        socket.on('start:game:error', ({ message }) => {
          console.log(message);
        });
      },
    },
  };
};
