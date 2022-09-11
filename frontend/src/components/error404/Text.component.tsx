import React from 'react'
import './text.scss'

interface Props {
	text: string
}

export const Text = (props: Props): JSX.Element => {
	return (
		<div className="container">
			<h1 className="erreur-404">404</h1>
			<p className="text-center">{props.text}</p>
		</div>
	)
}
