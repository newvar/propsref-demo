import React, { useEffect, useCallback, useRef } from "react";

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

const useLiveRef = value => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

const Component = ({
  mute,
  toggleMute,
  volume,
  increaseVolume,
  src,
  setSrc
}) => {
  const propsRef = useLiveRef({
    mute,
    volume
  });

  const applyVolume = useCallback(() => {
    const { volume, mute } = propsRef.current;
    if (mute) {
      externalApi.setVolume(0);
    } else {
      externalApi.setVolume(volume);
    }
  }, [propsRef]);

  useEffect(() => {
    applyVolume();
  }, [applyVolume, volume, mute]);

  const fetchHandler = useCallback(() => {
    applyVolume();
  }, [applyVolume]);

  useEffect(() => {
    externalApi.onFetched(fetchHandler);
    externalApi.fetch(src);
  }, [src, fetchHandler]);

  return (
    <div>
      <div>muted: {mute ? "yes" : "no"}</div>
      <button onClick={toggleMute}>{mute ? "Unmute" : "Mute"}</button>
      <div>volume: {volume}</div>
      <button onClick={increaseVolume}>change volume</button>
      <div>current file: {src}</div>
      <button onClick={() => setSrc("file1")}>load file1</button>
      <button onClick={() => setSrc("file2")}>load file2</button>
    </div>
  );
};

export default Component;
