/* eslint-disable prettier/prettier */
import { Socket } from 'socket.io-client';

export const listeners = (socket: Socket) => {
  return {
    onConnection: {
      success: () => {
        socket.on('connection:success', ({ id }) => {
          console.log('connection:success', id);
          context.dispatch({ type: 'SET_PLAYER_ID', value: id });
        });
      },
    },
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
      success: (context, navigate: () => void) => {
        socket.on('join:room:success', ({ players }) => {
          context.dispatch({ type: 'SET_PLAYERS', value: players });
          navigate(`/${window.location.pathname.slice(6, window.location.pathname.length)}`);
        });
      },
      error: () => {
        socket.on('join:room:error', ({ message }) => {
          console.log(message);
        });
      },
    },
  };
};
