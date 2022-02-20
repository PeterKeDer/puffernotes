import './Home.css';
import NavButton from '../components/NavButton';
// import UploadBox from '../components/UploadBox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        <header className="header-text">
          <h1>PufferNotes</h1>
          <h3>AI-powered summaries of lecture recordings, speeches, audiobooks, and more</h3>
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
      </section>

      <section className="white-background">
        {/* <UploadBox></UploadBox> */}
      </section>


    </ThemeProvider>
  );
};

export default Home;