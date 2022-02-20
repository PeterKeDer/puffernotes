import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

import {
  WaveformContianer,
  Wave,
  PlayButton,
  AudioControl,
  AudioControlDisplay,
} from "./Waveform.styled";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { msToTimeString } from "../../helpers/timeUtil";

class Waveform extends Component {
  state = {
    ready: false,
    playing: false,
    total_audio_time_value: 0,
    total_audio_time_label: "",
    current_audio_time_value: 0,
    current_audio_time_label: "",
  };

  componentDidMount() {
    console.log("Loading");
    const track = document.querySelector("#track");
    this.setState({ total_audio_time_value: 0 });
    this.setState({ total_audio_time_label: msToTimeString(0) });
    this.setState({ current_audio_time_value: 0 });
    this.setState({ current_audio_time_label: msToTimeString(0) });

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#2D5BFF",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
    });

    this.waveform.load(track);

    this.waveform.on("ready", () => {
      let time_value = this.waveform.getDuration();
      this.setState({ ready: true });
      this.setState({ total_audio_time_value: time_value });
      this.setState({
        total_audio_time_label: msToTimeString(time_value * 1000),
      });
    });
    this.waveform.on("audioprocess", () => {
      let time_value = this.waveform.getCurrentTime();
      this.setState({ current_audio_time_value: time_value });
      this.setState({
        current_audio_time_label: msToTimeString(time_value * 1000),
      });
    });
  }

  handleSetTime = (time) => {
    this.waveform.seekTo(time / this.state.total_audio_time_value);
  };

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.set_time !== this.state.current_audio_time_value) {
      console.log(
        "SET TIME! ",
        this.state.current_audio_time_value,
        " to ",
        nextProps.set_time
      );
      this.handleSetTime(nextProps.set_time);
    }
  }

  generatePlayPause(status) {
    if (!status) {
      return <PlayArrowIcon />;
    }
    return <PauseIcon />;
  }

  render() {
    if (!this.props.hasOwnProperty("audio_url")) {
      console.log("No Audio URL passed in!");
    }
    const url = this.props.audio_url;

    return (
      <AudioControl>
        <WaveformContianer>
          <PlayButton onClick={this.handlePlay}>
            {this.generatePlayPause(this.state.playing)}
          </PlayButton>

          <Wave id="waveform" />
          <audio id="track" src={url} />
        </WaveformContianer>
        <AudioControlDisplay>
          <div>
            {this.state.current_audio_time_label}/
            {this.state.total_audio_time_label}
          </div>
          {/* <h4 onClick={this.handleSetTime}>ff50</h4> */}
        </AudioControlDisplay>
      </AudioControl>
    );
  }
}

export default Waveform;
