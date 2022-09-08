import React from 'react'
import './button.scss';

interface Props {
  content: string;
  onClick?: () => void;
}

export const Button = (props: Props): JSX.Element => {
  return (
    <button className="button-primary"
      onClick={props.onClick}
    >
      {props.content}</button>
  );
}