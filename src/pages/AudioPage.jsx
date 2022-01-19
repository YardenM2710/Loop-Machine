import { useEffect, useRef, useState } from 'react';
import { audioService } from '../services/audioService';
import { AudioList } from '../components/AudioList';
import { AudioActions } from '../components/AudioActions';
import { Ruler } from '../components/Ruler';
import { useInterval } from 'react-interval-hook';
import { MainHeader } from '../components/MainHeader';
export function AudioPage() {
  const [audios, setAudios] = useState(null);
  const [currTrackTime, setTrackTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const [isLooping, setIsLoop] = useState(false);

  const [interval, setTrackInterval] = useState(false);
  // 1 seoncds = 10 -- > 10 * 10 = 100
  useEffect(() => {
    loadAudios();
  }, []);
  const { start, stop, isActive } = useInterval(
    () => {
      setIsPlaying(true); // Set;
      setTrackTime(currTrackTime + 0.1);
      setCursorPos((cursorPos) => cursorPos + 5.882352941176471 / 10); /// Check if needed here

      if (currTrackTime > 17.1) {
        setIsPlaying(false);
        setTrackTime(0);
        setCursorPos(0);
        stop();
        if (isLooping) {
          start();
        }
      } // Currently only 10 seconds as 100
    },
    100,
    { autoStart: false }
  );

  // Interval functions
  const moveCursor = () => {
    start();
  };
  //Updates Interval Time

  //---------------------------------------------------------------------
  async function loadAudios() {
    try {
      const audios = await audioService.query();
      setAudios(audios);
    } catch (err) {
      console.log('Couldnt load audios', err);
    }
  }

  const stopCursor = () => {
    console.log('stopCursor', interval);
    stop();
  };

  const removeAudio = async (audioId) => {
    try {
      await audioService.deleteAudio(audioId);
      loadAudios();
    } catch (err) {
      console.log('Could remove audio', err);
    }
  };

  //---------------------------------------------------------------------
  const togglePlay = () => {
    if (isActive()) {
      stop();
      setIsPlaying(false);
      console.log('Stopping all Audios!!');
    } else {
      start();
      setIsPlaying(true);
      console.log('starting all Audios!!');
    }

    // start();
  };

  const onStopPlaying = () => {
    stop();
    console.log('STOP!!');
    setCursorPos(0);
    setTrackTime(0);
    setIsPlaying(false);
  };

  ////-----------------------------------

  const setMuted = async (id) => {
    let newAudios = audios.map((audio) => {
      if (id === audio._id) {
        audio.isMuted = !audio.isMuted;
        console.log('Set muted id:', id, ' to ', audio.isMuted);
      }
      return audio;
    });
    setAudios(newAudios);
    console.log('Setting audios, IM HAPPENNING FIRST ?');
  };

  useEffect(() => {
    console.log('Setting audios, IM HAPPENNING SECOND', audios);
  }, [audios]);

  const setIsLooping = () => {
    setIsLoop((isLooping) => !isLooping);
  };

  if (!audios) return <div>Loading...</div>;
  return (
    <>
      <MainHeader />

      <div className="container">
        <Ruler />

        <AudioList
          currTrackTime={currTrackTime}
          moveCursor={moveCursor}
          stopCursor={stopCursor}
          setMuted={setMuted}
          removeAudio={removeAudio}
          audios={audios}
          isPlaying={isPlaying}
          cursorPos={cursorPos}
          setCursorPos={setCursorPos}
        />
        <AudioActions
          setIsLooping={setIsLooping}
          stopPlaying={onStopPlaying}
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          isLooping={isLooping}
        />
      </div>
    </>
  );
}
