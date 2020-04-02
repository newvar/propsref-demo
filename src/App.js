import React, { useState } from "react";
import Component from "./Component-2-fixed";

const ComponentContainer = () => {
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [src, setSrc] = useState("file0");
  return (
    <Component
      mute={mute}
      toggleMute={() => setMute(prevMute => !prevMute)}
      volume={volume}
      increaseVolume={() => setVolume(prevVolume => prevVolume + 1)}
      src={src}
      setSrc={setSrc}
    />
  );
};

const App = () => <ComponentContainer />;

export default App;
