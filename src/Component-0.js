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

class Component extends React.Component {
  applyVolume() {
    if (this.props.mute) {
      externalApi.setVolume(0);
    } else {
      externalApi.setVolume(this.props.volume);
    }
  }

  fetchHandler = () => {
    this.applyVolume();
  };

  fetch() {
    externalApi.onFetched(this.fetchHandler);
    externalApi.fetch(this.props.src);
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mute !== prevProps.mute) this.applyVolume();
    if (this.props.volume !== prevProps.volume) this.applyVolume();
    if (this.props.src !== prevProps.src) this.fetch();
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
