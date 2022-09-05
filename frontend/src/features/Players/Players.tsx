import React from 'react';
import PlayersCard from './composant/PlayersCard/PlayersCard';
import Life from './composant/Life/Life';
import './Players.scss';

function Players() {
	return (
		<div className="containerPlayers">
			<div className="pseudo">Pseudo</div>
			<span className="life">
				<Life life={3} />
			</span>
			<PlayersCard />
			<div className="word">PIE</div>
		</div>
	);
}

export default Players;
