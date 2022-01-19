import PlayCircle from '@mui/icons-material/PlayCircle';
import Stop from '@mui/icons-material/Stop';
import Mic from '@mui/icons-material/Mic';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pause from '@mui/icons-material/Pause';
import { useState } from 'react';
import { Loop } from '@mui/icons-material';

export function AudioActions({
  togglePlay,
  stopPlaying,
  setIsLooping,
  isLooping,
  isPlaying,
}) {
  const toggleBtn = () => {
    togglePlay();
  };

  return (
    <div className="audio-actions">
      <ToggleButtonGroup aria-label="device">
        <ToggleButton
          style={{
            backgroundColor: isPlaying
              ? 'rgb(255 255 255 / 0.3)'
              : 'rgb(255 255 255 / 0)',
          }}
          onClick={toggleBtn}
          value="laptop"
          aria-label="laptop"
        >
          {isPlaying ? <Pause /> : <PlayCircle />}
        </ToggleButton>
        <ToggleButton onClick={stopPlaying} value="stop" aria-label="tv">
          <Stop />
        </ToggleButton>
        <ToggleButton
          style={{
            backgroundColor: isLooping
              ? 'rgb(255 255 255 / 0.3)'
              : 'rgb(255 255 255 / 0)',
          }}
          onClick={setIsLooping}
          value="phone"
          aria-label="phone"
        >
          <Loop />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
