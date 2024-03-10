// App.js


import React from 'react';
import AudioRecorder from './AudioRecorder'; // Comment out the import statement


function App() {
  return (
    <div className="App">
      <h1>My React App</h1>
      {<AudioRecorder />} {/* Comment out the usage of the AudioRecorder component */}
    </div>
  );
}


export default App;