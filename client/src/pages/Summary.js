
import React, { Component } from 'react';
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
        {/* <h1>Supper Cool IDS League Lecture Summary</h1>
        <div class="flex-container">
          <div class="flex-child magenta">
            Flex Column 1
            <div onClick={this.seekTo}> CLICK ME </div>
          </div>

          <div class="flex-child green">
            <Waveform audio_url={AUDIO_LECTURE} set_time={this.state.setTime} />
          </div>

        </div> */}
      </div >
    );
  }
};

export default Summary;