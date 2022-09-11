import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import React, { useState } from 'react'
import { Socket } from 'socket.io-client'

export const join = (socket: Socket) => {
	const [inputValue, setInputValue] = useState<string | null | undefined>('test')
	const [hasError, setHasError] = useState(false)

	const checkNickname = () => {
		if (inputValue && inputValue.length) {
			setHasError(false)
			return
		}
		setHasError(true)
		return
	}

	const joinRoom = () => {
		checkNickname()
		if (!hasError) {
			// rejoingnage de la room
			socket.emit('join:room', { name: inputValue, room: 'idSocket' })
			console.log('Rejoingnage de la partie')

			// réception du message d'erreur lors du rejoingnage de la room
			socket.on('join:room:error', (args) => {
				console.log(args.message)
			})

			// réception du message de success lors du rejoingnage de la room
			socket.on('join:room:success', (...args) => {
				console.log(...args)
				// Afficher la view du jeu
			})
		}
	}

	return (
		<div className="landing-page">
			<h1 className="landing-page-title">Entrer votre pseudo</h1>
			<Input
				id="name"
				name="name"
				onChange={(e) => setInputValue(e)}
				placeholder="Entrer votre pseudo"
				value={inputValue}
			/>
			<p className={'landing-page-error-message ' + (hasError && 'show')}>
				Veuillez choisir un pseudo
			</p>
			<Button onClick={() => joinRoom()} content="Rejoindre la partie" />
		</div>
	)
}
