/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './Game.scss';
import Bomb2 from '../../style/images/bomb2.svg';
import { PlayersList } from './Data';

import Players from '../Players/Players';
import { Button } from '@/components/button/Button';

interface Props {
  start?: () => void;
}

function WaitingRoom(props: Props) {
  const [value, setValue] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(PlayersList[0].name);
  const [isHost, setIsHost] = useState(true);

  return (
    <div className="body">
      <div className="containerBomb">
        <div className="bomb">
          <div style={{ position: 'relative' }}>
            <img src={Bomb2} alt="bomb" />
          </div>
        </div>

        <div className="players">
          {PlayersList.map((player, i) => {
            return <Players key={i} name={player.name} value={currentPlayer == player.name ? value : null} />;
          })}
        </div>
        {isHost ? (
          <Button content="Lancer la partie" onClick={props.start} />
        ) : (
          <p style={{ color: 'white' }}>En attente de l’hôte de la partie...</p>
        )}
      </div>
    </div>
  );
}

export default WaitingRoom;
