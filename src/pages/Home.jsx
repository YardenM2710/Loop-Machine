import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MainHeader } from '../components/MainHeader';

export function Home() {
  const history = useHistory();

  return (
    <>
      <div className="home-page">
        <MainHeader />
        <div className="home-page-details">
          <h1>Welcome to my Woop ti Loop App </h1>
          <p>
            Live looping is the recording and playback of a piece of music in
            real-time[1] using either dedicated hardware devices, called loopers
            or phrase samplers, or software running on a computer with an audio
            interface.
          </p>
          <button
            onClick={() => history.push('/audio')}
            className="nice-button"
          >
            Lets have a 'Loop'
          </button>
        </div>
      </div>
    </>
  );
}
