/* eslint-disable prettier/prettier */
import React from 'react';
import './app.scss';
import Game from './features/Game/Game';
import { SocketProvider } from './providers/socket.provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Create } from './features/Game/create/Create';

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/:id" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
