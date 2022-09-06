import React, { useEffect, useState } from 'react';
import './Game.scss';
import Bomb from '../../style/images/bomb';
import Bomb2 from '../../style/images/bomb2.svg';
import Star from '../../style/images/star.svg';

import Players from '../Players/Players';

function Game() {
	const [value, setValue] = useState('');
	const [isMyTurn, setIsMyTurn] = useState(true); // temporaire :  a voir comment recuperer l'etat pour savoir qui joue
	const players = [{ name: 'test' }, { name: 'test2' }, { name: 'test3' }, { name: 'test4' }];
	const [increment, setIncrement] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(players[0].name);
	const [letter, setLetter] = useState('NT');

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			if (value.toUpperCase().indexOf(letter) > -1) {
				if (increment < players.length - 1) {
					setIncrement(increment + 1);
					setCurrentPlayer(players[increment].name);
				} else {
					setIncrement(0);
					setCurrentPlayer(players[increment].name);
				}
			}

			setValue('');
		}
	};

	return (
		<div className="body">
			<div className="title">
				<img src={Bomb} alt="bomb" />
				<h1>Bomb Party</h1>
			</div>
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
					{players.map((player, i) => {
						return (
							<Players
								key={i}
								active={currentPlayer == player.name ? true : false}
								name={player.name}
								value={currentPlayer == player.name ? value.toLocaleUpperCase() : null}
							/>
						);
					})}
				</div>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyPress={(e) => handleKeyPress(e)}
					className="input"
					type="text"
					id="name"
					name="name"
				/>
			</div>
		</div>
	);
}

export default Game;
