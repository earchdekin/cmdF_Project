import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import TextFileReader from './Pages/TextFileReader';
import WordsList from './Pages/WordsList';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/textfile">TextFileReader</Link>
            </li>
            <li>
              <Link to="/wordslist">WordsList</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/textfile" element={<TextFileReader />} />
          <Route path="/wordslist" element={<WordsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
