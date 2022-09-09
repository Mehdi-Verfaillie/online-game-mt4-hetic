import React, { useState, useEffect } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import './landingpage.scss'
import { io } from 'socket.io-client'

export const LandingPage = () => {
	const [inputValue, setInputValue] = useState<string | null | undefined>('test')
	const [hasError, setHasError] = useState(false)
	const [createOrJoin, setCreateOrJoin] = useState<'create' | 'join'>('create')
	const socket = io('ws://localhost:3000')
	const idSocket = 'idbidon123'

	// fonction pour checker le nom de l'user s'il existe ou pas
	const checkNickname = () => {
		if (inputValue && inputValue.length) {
			setHasError(false)
			return false
		}
		setHasError(true)
		return true
	}

	const joinRoom = () => {
		if (!checkNickname()) {

			// rejoingnage de la room
			socket.emit('join:room', {name: inputValue, room: idSocket})
			console.log('Rejoingnage de la partie');

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

	const createRoom = () => {
		if (!checkNickname()) {
			// Connect to Socket IO to get the socket ID

			// - creation d'une partie
			socket.emit('create:room', {name: inputValue})
			console.log('Creation d"une partieeeeee');
			

			// réception du message d'erreur sur la creation d'une room
			socket.on('create:room:error', (...args) => {
				console.log(...args)
			})

			// réception du message de success sur la creation d'une room
			socket.on('create:room:success', (...args) => {
				console.log(...args)
				window.history.pushState('data', 'Title', `${idSocket}`)
				// Afficher la view du jeu
			})
			return
		}
	}

	const isCreateOrJoin = () => {
		if (window.location.pathname === '/') {
			setCreateOrJoin('create')
			console.log('création une partie')
		} else {
			// Checker si l'id de la room existe
			setCreateOrJoin('join')
			console.log('rejoindre une partie')
		}
	}

	// const socket = io();

	useEffect(() => {
		isCreateOrJoin()
	}, [])

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
			<Button onClick={() => {createOrJoin === 'create' ? createRoom() : joinRoom()}} content={createOrJoin === 'create' ? "Créer une partie" : "Rejoindre la partie"} />
		</div>
	)
}
