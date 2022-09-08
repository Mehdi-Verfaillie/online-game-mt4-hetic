/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './Game.scss';
import Bomb from '../../style/images/bomb.svg';
import Bomb2 from '../../style/images/bomb2.svg';
import Star from '../../style/images/star.svg';
import { EngWordApi } from './api/EngWordApi';
import { LetterList, PlayersList } from './Data';

import Players from '../Players/Players';
function Game() {
	const [value, setValue] = useState('');
	const [isMyTurn, setIsMyTurn] = useState(true); // temporaire :  a voir comment recuperer l'etat pour savoir qui joue
	const [increment, setIncrement] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(PlayersList[0].name);
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
			setIncrement(increment + 1);
		}
	}, [counter]);

	useEffect(() => {
		if (PlayersList[increment] == 'dead') {
			setIncrement(increment + 1);
		} else {
			setCurrentPlayer(PlayersList[increment].name);
		}
	}, [increment]);

	useEffect(() => {
		if (currentPlayer == 'dead') setIncrement(increment + 1);
	}, [currentPlayer]);

	const handleKeyPress = async (event) => {
		if (event.key === 'Enter') {
			const exist = await EngWordApi(value);
			if (exist == true && value.toUpperCase().indexOf(letter) > -1) {
				if (increment < PlayersList.length - 1) {
					setIncrement(increment + 1);

					setLetter(random());
				} else {
					setIncrement(0);
					setCurrentPlayer(PlayersList[increment].name);
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
					{dead.length == PlayersList.length - 1 ? (
						<>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									color: 'white',
								}}
							>
								<p>WIN</p>
								<Players active={false} name={PlayersList[increment].name} value={null} />
							</div>
						</>
					) : (
						PlayersList.map((player, i) => {
							if (player == 'dead') {
								return <Players active={false} name={null} value={null} isDead={true} />;
							}
							return (
								<Players
									key={i}
									active={currentPlayer == player.name ? true : false}
									name={player.name}
									value={currentPlayer == player.name ? value : null}
								/>
							);
						})
					)}
				</div>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value.toLocaleUpperCase())}
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
