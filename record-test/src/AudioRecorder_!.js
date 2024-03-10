import React, { useState, useEffect } from 'react';

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let timerId;
  
    const sendAudioData = async () => {

        // Check if the microphone is currently recording
    const isMicrophoneRecording = mediaRecorder && mediaRecorder.state === 'recording';
    console.log('Microphone recording:', isMicrophoneRecording ? 'Yes' : 'No');
    console.log('audio chunks size:', audioChunks.length);

    const currentData = mediaRecorder.stream.getAudioTracks()[0].getSettings().sampleRate;
    setAudioChunks(prevChunks => [...prevChunks, currentData]);
    
      try {
        if (audioChunks.length === 0 || !isRecording) {
          console.error('No audio data available or recording stopped');
          return;
        }
  
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  
        // Create FormData object to send the audio blob as multipart/form-data
        const formData = new FormData();
        formData.append('audio', audioBlob); // Append the audio Blob to the FormData object
  
        console.log('FormData:', formData);
  
        // Make a POST request to the /audio endpoint on your backend server
        const response = await fetch('http://localhost:3000/audio', {
          method: 'POST',
          body: formData,
        });
  
        // Handle response from server
        if (response.ok) {
          console.log('Audio data sent successfully');
          //setAudioChunks([]); // Clear audio chunks after sending
        } else {
          console.error('Failed to send audio data:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending audio data:', error);
      }
    };
  
    timerId = setInterval(() => {
      if (isRecording) {
        sendAudioData();
      }
    }, 5000); // Send audio data every 2 seconds regardless of recording state
  
    return () => {
      clearInterval(timerId); // Cleanup on component unmount
    };
  }, [audioChunks, isRecording]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.addEventListener('dataavailable', event => {
        setAudioChunks(prevChunks => [...prevChunks, event.data]);
      });
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      console.log("Started recording");
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        setIsRecording(false);
        console.log("Stopped recording");
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default AudioRecorder;
