import { ToggleButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { VolumeMute, VolumeOff } from '@mui/icons-material';

export function AudioPreview({ audio, currTrackTime, setMuted, isPlaying }) {
  const [currAudio, setAudio] = useState(false);

  useEffect(() => {
    setAudio(new Audio(audio.src));
  }, []);
  const togglePlay = () => {
    setMuted(audio._id);
  };

  useEffect(() => {
    if (!currAudio) return;
    currAudio.currentTime = currTrackTime || 0;
    if (audio.isMuted || !isPlaying) {
      currAudio.pause();
      // console.log('Im not playing: ', audio._id);
    } else {
      currAudio.play();
      console.log('Im playing: ', audio._id);
    }
  }, [isPlaying]);

  // isAllPlaying ? allAudio.play() : allAudio.pause();

  return (
    <div style={{ backgroundColor: audio.color }} className="audio-preview">
      <p>{audio.title}</p>
      <ToggleButton onClick={togglePlay} value="laptop" aria-label="laptop">
        {!audio.isMuted ? <VolumeMute /> : <VolumeOff />}
      </ToggleButton>
    </div>
  );
}
