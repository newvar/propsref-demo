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

const useApplyVolumeMethod = (externalApi, propsRef) =>
  useCallback(() => {
    const { volume, mute } = propsRef.current;
    if (mute) {
      externalApi.setVolume(0);
    } else {
      externalApi.setVolume(volume);
    }
  }, [externalApi, propsRef]);

const useApplyVolumeEffect = (applyVolume, volume, mute) =>
  useEffect(() => {
    applyVolume();
  }, [applyVolume, volume, mute]);

const useFetchHandler = applyVolume =>
  useCallback(() => {
    applyVolume();
  }, [applyVolume]);

const useFetchEffect = (externalApi, src, fetchHandler) =>
  useEffect(() => {
    externalApi.onFetched(fetchHandler);
    externalApi.fetch(src);
  }, [externalApi, src, fetchHandler]);

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

  const applyVolume = useApplyVolumeMethod(externalApi, propsRef);
  const fetchHandler = useFetchHandler(applyVolume);

  useApplyVolumeEffect(applyVolume, volume, mute);
  useFetchEffect(externalApi, src, fetchHandler);

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
