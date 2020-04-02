import React, { useEffect } from "react";

class ExternalAPI {
  volume = 0;
  setVolume(volume) {
    this.volume = volume;
    console.log("new api volume:", volume);
  }
  getVolume() {
    return this.volume;
  }
  fetchedHandler = null;
  fetch(src) {
    console.log("fetch data:", src);
    this.fetchedHandler && this.fetchedHandler();
  }
  onFetched(handler) {
    this.fetchedHandler = handler;
  }
}

const externalApi = new ExternalAPI();

const Component = ({ mute, toggleMute, volume, increaseVolume }) => {
  const applyVolume = () => {
    if (mute) {
      externalApi.setVolume(0);
    } else {
      externalApi.setVolume(volume);
    }
  };

  useEffect(() => {
    applyVolume();
  }, [volume, mute]);

  return (
    <div>
      <div>muted: {mute ? "yes" : "no"}</div>
      <button onClick={toggleMute}>{mute ? "Unmute" : "Mute"}</button>
      <div>volume: {volume}</div>
      <button onClick={increaseVolume}>change volume</button>
    </div>
  );
};

export default Component;
