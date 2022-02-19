import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      {/*  */}
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="summary" element={<Summary />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
