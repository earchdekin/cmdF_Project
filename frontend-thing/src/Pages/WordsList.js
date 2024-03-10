import React, { useState, useEffect } from 'react';
import './../styles.css'; // Import the CSS file

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

  return (
    <div className="container">
      <div>
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
                        src="./trash.png" // Relative path to the image
                        alt="Delete"
                        style={{ cursor: 'pointer' }} // Add styling to change cursor to pointer on hover
                        onClick={() => handleDeleteWord(word)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="filter" className="filter-button" onClick={handleFilterVoiceChat}>Filter voice chat now</button>
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
            <button type="filter" className="filter-button" onClick={handleFilterVoiceChat}>Filter VoiceChat Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsList;
