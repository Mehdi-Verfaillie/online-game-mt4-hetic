import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import React, { useState } from 'react'
import { Socket } from 'socket.io-client'

export const create = (socket: Socket) => {
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

	console.log(socket)

	const createRoom = () => {
		checkNickname()
		if (!hasError) {
			// Connect to Socket IO to get the socket ID

			// - creation d'une partie
			socket.emit('create:room', { name: inputValue })
			console.log('Creation d"une partieeeeee')

			// réception du message d'erreur sur la creation d'une room
			socket.on('create:room:error', (...args) => {
				console.log(...args)
			})

			// réception du message de success sur la creation d'une room
			socket.on('create:room:success', (...args) => {
				console.log(...args)
				window.history.pushState('data', 'Title', `${'idSocket'}`)
				// Afficher la view du jeu
			})
			return
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
			<Button onClick={() => createRoom()} content="Créer une partie" />
		</div>
	)
}
