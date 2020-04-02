import React from "react";

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

const applyVolumeMethod = (externalApi, props) => {
  if (props.mute) {
    externalApi.setVolume(0);
  } else {
    externalApi.setVolume(props.volume);
  }
};

const fetchHandler = (externalApi, applyVolumeMethod, props) => {
  applyVolumeMethod(externalApi, props);
};

const fetchMethod = (externalApi, fetchHandler, props) => {
  externalApi.onFetched(fetchHandler);
  externalApi.fetch(props.src);
};

class Component extends React.Component {
  componentDidMount() {
    fetchMethod(externalApi, fetchHandler, this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.mute !== prevProps.mute)
      applyVolumeMethod(externalApi, this.props);
    if (this.props.volume !== prevProps.volume)
      applyVolumeMethod(externalApi, this.props);
    if (this.props.src !== prevProps.src)
      fetchMethod(externalApi, fetchHandler, this.props);
  }

  render() {
    const {
      mute,
      toggleMute,
      volume,
      increaseVolume,
      src,
      setSrc
    } = this.props;
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
  }
}

export default Component;
