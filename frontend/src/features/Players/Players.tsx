import React from 'react';
import PlayersCard from './composant/PlayersCard/PlayersCard';
import Life from './composant/Life/Life';
import './Players.scss';

type Props = {
	active?: boolean;
	name?: string;
	value?: string;
	isDead?: boolean;
};

function Players(props: Props) {
	return (
		<div data-isdead={props.isDead} className="containerPlayers">
			<div className="pseudo">{props.name}</div>
			<span className="life">
				<Life life={3} />
			</span>
			<PlayersCard active={props.active} />
			<div className="word">{props.value}</div>
		</div>
	);
}

export default Players;
