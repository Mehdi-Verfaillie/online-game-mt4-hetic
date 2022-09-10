export interface BaseInputProps<TValue = unknown> {
	placeholder: string
	id: string
	name: string
	value?: TValue
	onKeyPress?: (e: any) => void
	onChange: (value?: TValue) => void
}
