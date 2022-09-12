/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import './Game.scss';
import Bomb2 from '../../style/images/bomb2.svg';
import { SocketContext } from '@/providers/socket.provider';

import Players from '../Players/Players';
import { Button } from '@/components/button/Button';
import { Player } from '@/interfaces/game/player';

interface Props {
  player: Player;
  start?: () => void;
}

function WaitingRoom(props: Props) {
  const {
    state: { players },
  } = useContext(SocketContext);

  const isOwner = useMemo(() => {
    if (props.player.role !== 'owner') return false;
    return true;
  }, [props.player.role]);

  const context = useContext(SocketContext);

  useEffect(() => {
    context.listeners.onJoinRoom.success(context);
    context.listeners.onJoinRoom.error();
  }, [context]);

  return (
    <div className="body">
      <p style={{ textAlign: 'center', color: 'white' }}> http://localhost:3000</p>

      <div className="containerBomb">
        <div className="bomb">
          <div style={{ position: 'relative' }}>
            <img src={Bomb2} alt="bomb" />
          </div>
        </div>

        <div className="players">
          {players.map((player, i) => {
            return <Players key={player.id} name={player.name} />;
          })}
        </div>
        {isOwner ? (
          <Button content="Lancer la partie" onClick={props.start} />
        ) : (
          <p style={{ color: 'white' }}>En attente de l’hôte de la partie...</p>
        )}
      </div>
    </div>
  );
}

export default WaitingRoom;
