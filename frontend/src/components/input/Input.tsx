import React, { useMemo } from 'react'
import './input.scss'
import { BaseInputProps } from '@/interfaces/baseInput.interface'

export const Input = (props: BaseInputProps<string | null>): JSX.Element => {
	const formatedValue = useMemo(() => {
		if (props.value === null || props.value === undefined) return ''
		return props.value.trim()
	}, [props.value])

	const forwardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') return props.onChange(null)
		props.onChange(e.target.value)
	}

	return (
		<input
			className="input"
			type="text"
			onChange={forwardChange}
			onKeyPress={props.onKeyPress}
			placeholder={props.placeholder}
			id={props.id}
			name={props.name}
			value={formatedValue}
		/>
	)
}
