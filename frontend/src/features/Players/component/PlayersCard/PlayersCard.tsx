import React from 'react';
import './PlayersCard.scss';

import PlayersLogo from './player.svg';

type Props = {};

function PlayersCard() {
	return (
		<div className="container">
			<span className="logo">
				<img src={PlayersLogo} alt="logo" />
			</span>
		</div>
	);
}

export default PlayersCard;
