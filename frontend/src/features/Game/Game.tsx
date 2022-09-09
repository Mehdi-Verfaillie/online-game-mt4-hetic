/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import './Game.scss'
import Bomb from '../../style/images/bomb.svg'
import GameStart from './GameStart'
import WaitingRoom from './WaitingRoom'
function Game() {
	const [startGame, setStartGame] = useState(false)

	const start = () => {
		setStartGame(true)
	}

	return (
		<div className="body">
			<div className="title">
				<img src={Bomb} alt="bomb" />
				<h1>Bomb Party</h1>
			</div>
			{startGame ? <GameStart /> : <WaitingRoom start={start} />}
		</div>
	)
}

export default Game
