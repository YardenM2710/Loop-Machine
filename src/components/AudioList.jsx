import { useState, useRef } from 'react';
import { AudioPreview } from './AudioPreview';

export function AudioList({
  audios,
  onSelectAudio,
  removeAudio,
  isSinglePlaying,
  isAllPlaying,
  moveCursor,
  stopCursor,
  currTrackTime,
  setMuted,
  isPlaying,
  cursorPos,
  setCursorPos,
}) {
  const [isDrag, setIsDrag] = useState(false);
  const ref = useRef(null);
  const onMouseDown = () => {
    setIsDrag(true);
    console.log('Mousedown');
    // ref.current.style.transtion = 0;
  };
  const onMouseUp = () => {
    setIsDrag(false);
    console.log('Mouseup');
    ref.current.style.transitionDuration = '0.3s';
  };
  const onMove = (ev) => {
    ev.stopPropagation();
    if (isDrag) {
      // console.log('ev', ev.nativeEvent.offsetX);
      console.log('NODE: ,', ref);

      if (ev.nativeEvent.offsetX > 2) {
        var eachPercent = (window.innerWidth - 40) / 100; //
        let pos = ev.nativeEvent.offsetX / eachPercent;

        if (Math.abs(cursorPos - pos) > 8) return;
        setCursorPos(pos);
      }
      return;
    }
  };
  const cancelDrag = () => {
    if (isDrag) setIsDrag(false);
  };
  return (
    <section onMouseMove={onMove} onMouseUp={onMouseUp} className="audio-list">
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{ left: cursorPos + '%' }}
        className="line-through"
        ref={ref}
      ></div>
      {audios.map((audio) => (
        <AudioPreview
          currTrackTime={currTrackTime}
          setMuted={setMuted}
          stopCursor={stopCursor}
          moveCursor={moveCursor}
          isSinglePlaying={isSinglePlaying}
          isAllPlaying={isAllPlaying}
          removeAudio={removeAudio}
          onSelectAudio={onSelectAudio}
          audio={audio}
          key={audio._id}
          isPlaying={isPlaying}
        />
      ))}
    </section>
  );
}
