import React, { useState, useEffect } from 'react';

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
      <h1>Text File Content:</h1>
      <pre>{text}</pre>
    </div>
  );
}

export default TextFileReader;
