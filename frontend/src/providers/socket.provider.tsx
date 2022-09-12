import React, { createContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import { listeners as ioListeners } from './listeners';
import { emitters as ioEmitters } from './emitters';
import { Player } from '../interfaces/game/player';

interface Props {
  children: JSX.Element;
}

export const SocketContext = createContext<any>([{}, {}, {}, () => {}]);
const socket = io('ws://localhost:3333');

const initialState: { players: Player[]; id: string | null } = {
  players: [],
  playerId: null,
  roomId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, players: action.value };
    case 'SET_PLAYER_ID':
      return { ...state, playerId: action.value };
    case 'SET_ROOM_ID':
      return { ...state, roomId: action.value };
    default:
      return state;
  }
};

export const SocketProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const socket = io(process.env.REACT_APP_SOCKET_URL);
  const listeners = ioListeners(socket);
  const emitters = ioEmitters(socket);

  useEffect(() => {
    socket.on('connection:success', ({ id }) => {
      dispatch({ type: 'SET_PLAYER_ID', value: id });
    });
  }, []);

  return <SocketContext.Provider value={{ listeners, emitters, state, dispatch }}>{props.children}</SocketContext.Provider>;
};
