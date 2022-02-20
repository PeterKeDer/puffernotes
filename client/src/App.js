import './App.css';

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Result from "./pages/Result";
import Upload from "./pages/Upload";

function App() {
  useEffect(() => {
    document.title = "PufferNotes";
  }, []);

  return (
    <div className="App">
      {/*  */}
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="upload" element={<Upload />} />
            <Route path="result/:id" element={<Result />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
