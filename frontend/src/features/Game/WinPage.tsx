/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './Game.scss';
import Players from '../Players/Players';

interface Props {
  player?: string;
}

function WinPage(props: Props) {
  return (
    <div className="players">
      {
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <p>WIN</p>
            <Players active={false} name={props.player} value={null} />
          </div>
        </>
      }
    </div>
  );
}

export default WinPage;
