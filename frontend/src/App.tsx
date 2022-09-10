import React, { createContext, useContext, useState } from 'react'
import { Button } from './components/button/Button'
import { Input } from './components/input/Input'
import { LandingPage } from './views/LandingPage'
import './app.scss'
import Game from './features/Game/Game'
import { SocketProvider } from './providers/socket.provider'
import { io } from 'socket.io-client'

function App() {
	const clientAddress = 'ws://localhost:3000'

	return (
		<SocketProvider client={clientAddress}>
			<LandingPage />
			{/* <Game></Game> */}
		</SocketProvider>
	)
}

export default App
