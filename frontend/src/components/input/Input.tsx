import React from 'react'
import './input.scss';

interface Props {
    placeholder: string;
    id: string;
    name: string;
    type: string;
    value: string;
    onKeyPress?: () => void;
    onChange?: (e: any) => any;
}

export const Input = (props: Props): JSX.Element => {
    return (
        <input
            className="input"
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
        />
    )
}