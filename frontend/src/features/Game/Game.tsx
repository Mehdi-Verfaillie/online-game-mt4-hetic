/* eslint-disable prettier/prettier */
import React, { useContext, useMemo } from 'react';
import './Game.scss';
import Bomb from '../../style/images/bomb.svg';
import WaitingRoom from './WaitingRoom';
import { Join } from './join/Join';
import { SocketContext } from '@/providers/socket.provider';
import GameStart from './GameStart';

function Game() {
  const {
    state: { players, playerId, status },
  } = useContext(SocketContext);

  const player = useMemo(() => {
    const player = players.find(player => player.id === playerId);
    if (!player) return;
    return player;
  }, [playerId, players]);

  return (
    <div className="body">
      <div className="title">
        <img src={Bomb} alt="bomb" />
        <h1>Bomb Party</h1>
      </div>

      {status === 'ongoing' ? <GameStart /> : !player ? <Join /> : <WaitingRoom player={player} />}
    </div>
  );
}

export default Game;
