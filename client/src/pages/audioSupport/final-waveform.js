import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

class Waveform extends Component {
    state = {
        playing: false,
    };

    componentDidMount() {
        console.log("Loading")
        const track = document.querySelector('#track');

        this.waveform = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'WebAudio',
            height: 80,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#EFEFEF',
            cursorColor: 'transparent',
        });

        this.waveform.load(track);

        this.waveform.on('ready', function () {
            console.log("Hi")
        });
    };

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
    };

    render() {
        if (!this.props.hasOwnProperty('audio_url')) {
            console.log("No Audio URL passed in!")
        }
        const url = this.props.audio_url;
        console.log("Audio Source = ", url);
        return (
            <WaveformContianer>
                <PlayButton onClick={this.handlePlay} >
                    {!this.state.playing ? 'Play' : 'Pause'}
                </PlayButton>
                <Wave id="waveform" />
                <audio id="track" src={url} />
            </WaveformContianer>
        );
    }
};

export default Waveform;