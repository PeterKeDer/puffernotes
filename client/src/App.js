import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Upload from "./pages/Upload";
import Result from "./pages/Result";

import routes from './routes';

function App() {
  return (
    <div className="App">
      {/*  */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
            <Route path="upload" element={<Upload />} />
            <Route path="result/:id" element={<Result />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
