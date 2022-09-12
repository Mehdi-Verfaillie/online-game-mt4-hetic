/* eslint-disable prettier/prettier */
import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '@/providers/socket.provider';

export const Create = () => {
  const [inputValue, setInputValue] = useState<string | null | undefined>('test');
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const context = useContext(SocketContext);

  useEffect(() => {
    setHasError(inputValue && inputValue.length ? false : true);
  }, [hasError, inputValue]);

  useEffect(() => {
    context.listeners.onCreateRoom.success(context, navigate);
    context.listeners.onCreateRoom.error();
  }, [context, navigate]);

  const createRoom = () => {
    if (!hasError) {
      context.emitters.createRoom(inputValue);
    }
  };

  return (
    <div className="landing-page">
      <h1 className="landing-page-title">Entrer votre pseudo</h1>
      <Input id="name" name="name" onChange={e => setInputValue(e)} placeholder="Entrer votre pseudo" value={inputValue} />
      <p className={'landing-page-error-message ' + (hasError && 'show')}>Veuillez choisir un pseudo</p>
      <Button onClick={() => createRoom()} content="Créer une partie" />
    </div>
  );
};
