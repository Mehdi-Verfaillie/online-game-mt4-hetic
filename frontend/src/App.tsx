import React, { useState } from 'react'
import { Button } from './components/button/Button'
import { Input } from './components/input/Input'
import { LandingPage } from './views/LandingPage'
import './app.scss'
import Game from './features/Game/Game'

function App() {
	return (
		<div>
			<LandingPage />
			<Button onClick={() => console.log('test')} content="Créer une partie" />
			<Input
				id='name'
				name='name'
				type='text'
				onChange={(e) => setInputValue(e.target.value)}
				onKeyPress={() => console.log({inputValue})}
				placeholder="placeholder"
				value={inputValue}
			/>
		<div>	
		</div>
}

export default App
