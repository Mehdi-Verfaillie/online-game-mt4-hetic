/* eslint-disable prettier/prettier */
import React from 'react';
import './PlayersCard.scss';

import PlayersLogo from '../../../../style/images/player.svg';

type Props = {
	active: boolean;
};

function PlayersCard(props: Props) {
	return (
		<div data-play={props.active} className="container">
			<span className="logo">
				<img src={PlayersLogo} alt="logo" />
			</span>
		</div>
	);
}

export default PlayersCard;
