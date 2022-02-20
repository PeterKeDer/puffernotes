import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { WaveformContianer, Wave, PlayButton, AudioControl, AudioControlDisplay } from './Waveform.styled';

function msToTime(d) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m + ":";
    var sDisplay = s > 9 ? s : "0" + s;
    return hDisplay + mDisplay + sDisplay;
}


class Waveform extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.handleSetTime = React.createRef();
    }

    state = {
        playing: false,
        total_audio_time_value: 0,
        total_audio_time_label: "",
        current_audio_time_value: 0,
        current_audio_time_label: "",
    };

    componentDidMount() {
        console.log("Loading")
        const track = document.querySelector('#track');
        this.setState({ total_audio_time_value: 0 });
        this.setState({ total_audio_time_label: "00:00" });
        this.setState({ current_audio_time_value: 0 });
        this.setState({ current_audio_time_label: "00:00" });

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

        this.waveform.on('ready', () => {
            let time_value = this.waveform.getDuration();
            this.setState({ total_audio_time_value: time_value });
            this.setState({ total_audio_time_label: msToTime(time_value) });
        });
        this.waveform.on('audioprocess', () => {
            let time_value = this.waveform.getCurrentTime();
            this.setState({ current_audio_time_value: time_value });
            this.setState({ current_audio_time_label: msToTime(time_value) });
        });
    };


    handleSetTime = (progress) => {
        this.waveform.seekTo(progress)
    };

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
        // this.setState({ current_audio_time_value: this.waveform.getDuration() });
    };

    render() {
        if (!this.props.hasOwnProperty('audio_url')) {
            console.log("No Audio URL passed in!")
        }
        const url = this.props.audio_url;
        return (
            <AudioControl>
                <WaveformContianer>
                    <PlayButton onClick={this.handlePlay} >
                        {!this.state.playing ? 'Play' : 'Pause'}
                    </PlayButton>

                    <Wave id="waveform" />
                    <audio id="track" src={url} />
                </WaveformContianer>
                <AudioControlDisplay>
                    <div>{this.state.current_audio_time_label}/{this.state.total_audio_time_label}</div>
                    <h4 onClick={this.handleSetTime(0.5)}>ff50</h4>
                </AudioControlDisplay>
            </AudioControl>
        );
    }
};

export default Waveform;