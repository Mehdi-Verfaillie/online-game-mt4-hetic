/* eslint-disable prettier/prettier */
import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '@/providers/socket.provider';
// import '../../../views/landingpage.scss';

export const Join = () => {
  const [inputValue, setInputValue] = useState<string | null | undefined>('test');
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const context = useContext(SocketContext);

  useEffect(() => {
    setHasError(inputValue && inputValue.length ? false : true);
  }, [hasError, inputValue]);

  useEffect(() => {
    context.listeners.onJoinRoom.success(context, navigate);
    context.listeners.onJoinRoom.error();
  }, [context, navigate]);

  const joinRoom = () => {
    if (!hasError) {
      context.emitters.joinRoom(inputValue, window.location.pathname.slice(1, window.location.pathname.length));
    }
  };

  return (
    <div className="landing-page">
      <h1 className="landing-page-title">Entrer votre pseudo</h1>
      <Input id="name" name="name" onChange={e => setInputValue(e)} placeholder="Entrer votre pseudo" value={inputValue} />
      <p className={'landing-page-error-message ' + (hasError && 'show')}>Veuillez choisir un pseudo</p>
      <Button onClick={() => joinRoom()} content="Rejoindre la partie" />
    </div>
  );
};
