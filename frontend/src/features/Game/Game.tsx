/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import './Game.scss';
import Bomb from '../../style/images/bomb.svg';
import WaitingRoom from './WaitingRoom';
import { Join } from './join/Join';
import { SocketContext } from '@/providers/socket.provider';

function Game() {
  const {
    state: { players },
  } = useContext(SocketContext);

  return (
    <div className="body">
      <div className="title">
        <img src={Bomb} alt="bomb" />
        <h1>Bomb Party</h1>
      </div>
      {<WaitingRoom />}
    </div>
  );
}

export default Game;
