import React from 'react';
import PlayersCard from './component/PlayersCard/PlayersCard';
import Life from './component/Life/Life';
import './Players.scss';

type Props = {
  isActive?: boolean;
  name: string;
  answer?: string;
  isDead?: boolean;
};

function Players(props: Props) {
  return (
    <div data-isdead={props.isDead} className="containerPlayers">
      <div className="pseudo">{props.name}</div>
      <span className="life">
        <Life life={3} />
      </span>
      <PlayersCard active={props.isActive} />
      <div className="word">{props.answer}</div>
    </div>
  );
}

export default Players;
