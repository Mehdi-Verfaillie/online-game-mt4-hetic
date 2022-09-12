/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import './app.scss';
import Game from './features/Game/Game';
import { SocketContext, SocketProvider } from './providers/socket.provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Create } from './features/Game/create/Create';
import { Join } from './features/Game/join/Join';
import WaitingRoom from './features/Game/WaitingRoom';

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/:id" element={<WaitingRoom />} />
          <Route path="/join/:id" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>

    // <div>
    // 	{/* <LandingPage />
    // 	<>App</> */}
    // 	{/* <Button onClick={() => console.log('test')} content="Créer une partie" /> */}
    // 	<Game />
    // </div>
  );
}

export default App;
