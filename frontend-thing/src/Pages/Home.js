import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './../styles.css'; // Import the CSS file

import raw from './words_file.txt';

function TextFileReader() {
  const [text, setText] = useState('');

  useEffect(() => {
    const filePath = raw; // Specify the file path here
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        const data = await response.text();
        setText(data);
      } catch (error) {
        console.error('Error fetching text file:', error);
      }
    };

    // Fetch initial data
    fetchData();

    // Set up interval to fetch data periodically
    const intervalId = setInterval(fetchData, 5000); // Adjust the interval time as needed

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to Home Page</h1>
    <Popup trigger={<button>Trigger Popup</button>} position="right center">
      <TextFileReader />
    </Popup>
  </div>
);

export default Home;
