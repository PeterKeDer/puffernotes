import './Home.css';
import NavButton from '../components/NavButton';
import UploadBox from '../components/UploadBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../img/puffer_logo.png';
import clip from '../img/clip-01.png';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import RecordVoiceOverSharpIcon from '@mui/icons-material/RecordVoiceOverSharp';


const theme = createTheme({
  palette: {
    primary: {
      main: "#020887"
    },
    secondary: {
      main: "#ffb140"
    }
  }
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <section className="dark-blue-background">
        <img src={logo} alt="pufferfish" className="logo"></img>
        <header className="header-text">
          <p className="title">Puff Up <br></br> Your <b>Notes</b></p>
          <p className="bodyText">AI-powered summaries of lecture recordings, speeches, audiobooks, and more</p>
          <NavButton buttonColor="secondary"></NavButton>
        </header>
        
        <div className="wave2">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>

        <div className="wave1">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
        <img src={clip} alt="decoPic" align="right"></img>
      </section>

      <section className="white-background">
        {/* <UploadBox></UploadBox> */}
        <div className="intro_section">
          <p><b>How Does It Work?</b></p> 
          <hr className="yellowLine"></hr>
        </div>
        <div className="features-grid">
          <div><CollectionsBookmarkIcon className="features-grid icon"></CollectionsBookmarkIcon><p className="featureDescription"><b>Lorem ipsum dolor sit amet</b><br></br> consectetur adipiscing elit. Proin vehicula dui eu odio venenatis laoreet. Vestibulum ac est porta, dignissim enim vitae, blandit ante. Aliquam fermentum, mi at sodales auctor</p></div>
          <div><BorderColorSharpIcon className="features-grid icon"></BorderColorSharpIcon><p className="featureDescription"><b>Lorem ipsum dolor sit amet</b><br></br> consectetur adipiscing elit. Proin vehicula dui eu odio venenatis laoreet. Vestibulum ac est porta, dignissim enim vitae, blandit ante. Aliquam fermentum, mi at sodales auctor</p></div>
          <div><RecordVoiceOverSharpIcon className="features-grid icon"></RecordVoiceOverSharpIcon><p className="featureDescription"><b>Lorem ipsum dolor sit amet</b><br></br> consectetur adipiscing elit. Proin vehicula dui eu odio venenatis laoreet. Vestibulum ac est porta, dignissim enim vitae, blandit ante. Aliquam fermentum, mi at sodales auctor</p></div>
        </div>
        <div class="assembly"><a href="https://www.assemblyai.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand&gclid=CjwKCAiAx8KQBhAGEiwAD3EiP8p3EiAkgLyHvSDxKmS3QmE3rPUPPplFO1CLckH6AM3M7JgFa2lcUhoCgqIQAvD_BwE"><p class="assembly"><b>Powered by AssemblyAI</b></p></a></div>
      </section>
    </ThemeProvider>

  );
};

export default Home;