import React, { useState, useEffect } from 'react';

const WordsList = () => {
  const [userData, setUserData] = useState(null);
  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    fetchUser();
  }, []); // Fetch user data when component mounts

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/db/userlist/username');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data); // Set the fetched user data in state
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
      // Clear the input field and fetch updated user data
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
      // Fetch updated user data after deletion
      fetchUser();
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={handleAddWord}>Add Word</button>
      </div>
      {userData && (
        <table>
          <thead>
            <tr>
              <th>Words</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.words.map((word, index) => (
              <tr key={index}>
                <td>{word}</td>
                <td>
                  <button onClick={() => handleDeleteWord(word)}>Trash</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WordsList;
