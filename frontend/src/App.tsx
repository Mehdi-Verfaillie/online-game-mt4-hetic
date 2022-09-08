import React from 'react'
import { Button } from './features/components/button/Button'

function App() {
	return (
		<div>
			<>App</>
			<Button onClick={() => console.log('test')} content="Créer une partie" />
		</div>
	)
}

export default App
