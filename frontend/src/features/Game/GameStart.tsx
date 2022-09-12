/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import './Game.scss';
import Bomb2 from '../../style/images/bomb2.svg';
import Star from '../../style/images/star.svg';

import Players from '../Players/Players';
import { Input } from '@/components/input/Input';
import WinPage from './WinPage';
import { SocketContext } from '@/providers/socket.provider';

function GameStart() {
  const [value, setValue] = useState('');

  const {
    state: { players, hint, countdown },
    listeners,
    emitters,
    dispatch,
  } = useContext(SocketContext);

  useEffect(() => {
    listeners.onStartGame.success();
    listeners.onStartGame.error();
    listeners.endCountdown.fail(dispatch);
    // listeners.endRound.success(dispatch);
  }, [dispatch, listeners.endCountdown, listeners.endRound, listeners.onStartGame]);

  useEffect(() => {
    const timer = setTimeout(() => {
      emitters.endCountdown();
    }, countdown);
    return () => clearTimeout(timer);
  }, [countdown, emitters]);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      emitters.tryAnswer(value);
    }
  };

  return (
    <div className="body">
      <div className="containerBomb">
        <div className="bomb">
          <div style={{ position: 'relative' }}>
            <img src={Bomb2} alt="bomb" />
            <p className="letter">{hint}</p>
            <div className="star">
              <img src={Star} alt="star" />
            </div>
          </div>
        </div>

        <div className="players">
          {players.map(player => (
            <Players key={player.id} isActive={player.isPlayingRound} name={player.name} value={value} />
          ))}
        </div>

        <Input
          id="name"
          name="name"
          type="text"
          onChange={e => setValue(e)}
          onKeyPress={e => handleKeyPress(e)}
          placeholder="placeholder"
          value={value}
        />
      </div>
    </div>
  );
}

export default GameStart;
