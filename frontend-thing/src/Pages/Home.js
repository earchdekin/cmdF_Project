import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import './../styles.css'; // Import the CSS file

import raw from './words_file.txt';

const PopupContent = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

const Home = () => {
  const openPopup = () => {
    const popupWindow = window.open('', '_blank', 'width=600,height=400');
    popupWindow.document.write('<html><head><title>Popup Window</title></head><body><div id="popup-content"></div></body></html>');

    const container = popupWindow.document.getElementById('popup-content');
    container.appendChild(document.createElement('div'));
    container.firstChild.appendChild(document.createTextNode('Loading...'));

    const fetchData = async () => {
      try {
        const response = await fetch(raw);
        const data = await response.text();
        container.firstChild.innerHTML = ''; // Clear previous content
        ReactDOM.render(<PopupContent text={data} />, container.firstChild);
      } catch (error) {
        console.error('Error fetching text file:', error);
      }
    };

    // Fetch initial data
    fetchData();

    // Set up interval to fetch data periodically
    const intervalId = setInterval(fetchData, 5000); // Adjust the interval time as needed

    // Cleanup function to clear interval
    popupWindow.onbeforeunload = () => clearInterval(intervalId);
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <button onClick={openPopup}>Open Popup</button>
    </div>
  );
};

export default Home;
