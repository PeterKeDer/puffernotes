import React, { Component } from 'react';
import Waveform from './audioSupport/final-waveform'
import './style.css';
const AUDIO_MUSIC = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3"
// const AUDIO_LECTURE = "https://www.learnoutloud.com/samples/14832/Global%20Warming%20Global%20Threat%2001.mp3"
// const AUDIO_LECTURE = "https://ufile.io/brf0qxui"
const AUDIO_LECTURE = "http://localhost:8080/audio/okp24j2s0u-dbb8-4ade-870a-da92ac09b942"

class Summary extends Component {

  state = {
    setTime: 0,
  };

  seekTo = () => {
    console.log("click")
    this.setState({ setTime: this.state.setTime + 10 });
  }
  render() {
    return (
      <div>
        <h1>Supper Cool IDS League Lecture Summary</h1>
        <div class="flex-container">
          <div class="flex-child magenta">
            Flex Column 1
            <div onClick={this.seekTo}> CLICK ME </div>
          </div>

          <div class="flex-child green">
            <Waveform audio_url={AUDIO_LECTURE} set_time={this.state.setTime} />
          </div>

        </div>
      </div >
    );
  }
};

export default Summary;