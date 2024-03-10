// Home.js
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Home = () => (
  <div>
    <h1>Welcome to Home Page</h1>
    <Popup trigger={<button>Trigger Popup</button>} position="bottom">
      <div>Popup content here !!</div>
    </Popup>
  </div>
);

export default Home;
