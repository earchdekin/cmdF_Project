import React from 'react';
import { BroswerRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomeNext from './../../nextjs-dashboard/app/page/'
import WordsList from './Pages/WordsList';

function App() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/wordslist">WordsList</Link>
                <Link to="/login">Logint</Link>
              </li>
            </ul>
          </nav>
  
          <Routes>
            <Route path="/wordslist" element={<WordsList />} />
            <Route path="/home" element={<HomeNext />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;
  