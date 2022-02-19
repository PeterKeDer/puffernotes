import Waveform from './audioSupport/final-waveform'

const AUDIO_MUSIC = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3"

const Summary = () => {
  return (
    <div>
      <h1>Supper Cool IDS League Lecture Summary</h1>
      <Waveform audio_url={AUDIO_MUSIC}/>
    </div>

  );
};

export default Summary;