import React, { useState } from 'react'
import { Button } from './features/components/button/Button'
import { Input } from './features/components/input/Input'

function App() {
	const [inputValue, setInputValue] = useState('')
	return (
		<div>
			<>App</>
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
		</div>
	)
}

export default App
