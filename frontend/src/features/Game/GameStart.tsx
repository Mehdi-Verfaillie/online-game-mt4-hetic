/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './Game.scss';
import Bomb2 from '../../style/images/bomb2.svg';
import Star from '../../style/images/star.svg';
import { EngWordApi } from './api/EngWordApi';
import { LetterList, PlayersList } from './Data';

import Players from '../Players/Players';
import { Input } from '@/components/input/Input';
import WinPage from './WinPage';
function GameStart() {
  const [value, setValue] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(true); // temporaire :  a voir comment recuperer l'etat pour savoir qui joue
  const [increment, setIncrement] = useState(0);
  const [counter, setCounter] = useState(Math.floor(Math.random() * (15 - 10 + 1) + 10));

  const random = () => {
    return LetterList[Math.floor(Math.random() * LetterList.length)];
  };
  const [letter, setLetter] = useState(random());
  const [dead, setDead] = useState([]);

  useEffect(() => {
    if (dead.length != PlayersList.length - 1) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter == 0) {
      setDead([...dead, PlayersList[increment].name]);
      PlayersList.splice(increment, 1, 'dead');
      setCounter(Math.floor(Math.random() * (15 - 10 + 1) + 10));
      setIncrement(increment < PlayersList.length - 1 ? increment + 1 : 0);
    }
  }, [counter]);

  useEffect(() => {
    if (PlayersList[increment] == 'dead') setIncrement(increment < PlayersList.length - 1 ? increment + 1 : 0);
  }, [increment]);

  const handleKeyPress = async event => {
    if (event.key === 'Enter') {
      const exist = await EngWordApi(value);
      if (exist == true && value.toUpperCase().indexOf(letter) > -1) {
        if (increment < PlayersList.length - 1) {
          setIncrement(increment < PlayersList.length - 1 ? increment + 1 : 0);
          setLetter(random());
        } else {
          setIncrement(0);
        }
      }
      setValue('');
    }
  };

  return (
    <div className="body">
      <div className="containerBomb">
        <div className="bomb">
          <div style={{ position: 'relative' }}>
            <img src={Bomb2} alt="bomb" />
            <p className="letter">{letter}</p>
            <div className="star">
              <img src={Star} alt="star" />
            </div>
          </div>
        </div>

        <div className="players">
          {dead.length == PlayersList.length - 1 ? (
            <>
              <WinPage player={PlayersList[increment].name} />
            </>
          ) : (
            PlayersList.map((player, i) => {
              if (player == 'dead') {
                return <Players key={i} active={false} name={null} value={null} isDead={true} />;
              }
              return (
                <Players
                  key={i}
                  active={PlayersList[increment].name == player.name ? true : false}
                  name={player.name}
                  value={PlayersList[increment].name == player.name ? value : null}
                />
              );
            })
          )}
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
