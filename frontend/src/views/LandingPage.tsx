import React, { useState, useMemo } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import './landingpage.scss'
import { io } from 'socket.io-client'

export const LandingPage = () => {
	const [inputValue, setInputValue] = useState<string | null | undefined>('test')
	const [hasError, setHasError] = useState(false)

	const joinRoom = () => {
		//
	}

	const createRoom = () => {
		if (inputValue && inputValue.length) {
			setHasError(false)
			// CODE SOCKET IO ICI
			return
		}
		setHasError(true)
	}

	// const socket = io();

	return (
		<div className="landing-page">
			<h1 className="landing-page-title">Entrer votre pseudo</h1>
			<Input
				id="name"
				name="name"
				onChange={e => setInputValue(e)}
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
