import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './../styles.css'; // Import the CSS file
import 'reactjs-popup/dist/index.css';
import raw from './words_file.txt';

import logo from './logo.png';
import trash from './trash.png';

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

const WordsList = () => {
  const [userData, setUserData] = useState(null);
  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/db/userlist/username');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleAddWord = async () => {
    try {
      const response = await fetch('http://localhost:3000/db/userlist/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word: newWord })
      });
      if (!response.ok) {
        throw new Error('Failed to add word');
      }
      setNewWord('');
      fetchUser();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const handleDeleteWord = async (word) => {
    try {
      const response = await fetch(`http://localhost:3000/db/userlist/username/${word}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete word');
      }
      fetchUser();
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  const handleFilterVoiceChat = () => {
    console.log('Filtering voice chat now...');
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="container">
      <div>
        <div className="top-bar">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="logout-button-container">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
        <h1 className="title">List of filtered words in voice chat</h1>
        <h2 className="subtitle">Input the word you do not want to hear during voice chat. We will filter the speech for you.</h2>
        <div className="input-wrapper">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Enter a word"
          />
          <button type="submit" onClick={handleAddWord}>Add</button>
        </div>

        {userData && userData.words.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Words</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Additional line between the header and other rows */}
                <tr className="table-separator">
                  <td colSpan="2"></td>
                </tr>
                {userData.words.map((word, index) => (
                  <tr key={index}>
                    <td>{word}</td>
                    <td>
                      <img
                        src={trash} // Relative path to the image
                        alt="Delete"
                        style={{ cursor: 'pointer' }} // Add styling to change cursor to pointer on hover
                        onClick={() => handleDeleteWord(word)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Popup trigger={<button type="filter" className="filter-button">Filter voice chat now</button>} 
            position="left"
             contentStyle={{ 
               backgroundColor: '#333333', 
               color: '#333', 
               borderRadius: '5px', 
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', 
               padding: '20px',
               width: '400px', // Adjust the width as needed
               height: '300px' // Adjust the height as needed
             }}>
            <TextFileReader />
            
            </Popup>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Words</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Additional line between the header and other rows */}
                <tr className="table-separator">
                  <td colSpan="2"></td>
                </tr>
                <tr>
                  <td colSpan="1" className="no-words"><i>No words in the list for now.</i> <br /><i>Add in the text bar above to filter the speech in voice chat.</i></td>
                </tr>
              </tbody>
            </table>
            <Popup trigger={<button type="filter" className="filter-button">Filter voice chat now</button>}
             position="left"
             contentStyle={{ 
               backgroundColor: '#333333', 
               color: '#333', 
               borderRadius: '5px', 
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', 
               padding: '20px',
               width: '400px', // Adjust the width as needed
               height: '300px' // Adjust the height as needed
             }}
            >
                <TextFileReader />
            </Popup>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsList;
