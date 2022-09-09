import React, { useState } from 'react'
import { Button } from './components/button/Button'
import { Input } from './components/input/Input'
import { LandingPage } from './views/LandingPage'
import './app.scss'

function App() {
	const [inputValue, setInputValue] = useState('')
	return (
		<div>
			<LandingPage />
		</div>
	)
}

export default App
