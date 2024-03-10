import React, { useState, useEffect } from 'react';

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  let stream;
  let recorder;

  useEffect(() => {
    let timerId;

    const sendAudioData = async () => {
        console.log("recording?", mediaRecorder.state);

        
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
          setAudioChunks([]); // Clear audio chunks after sending
        } else {
          console.error('Failed to send audio data:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending audio data:', error);
      }
    };

    timerId = setInterval(async () => {
        if (isRecording) {
          // Stop recording
          stopRecording();
          // Send audio data
          await sendAudioData();
          // Start recording again
          startRecording();
        }
      }, 1000); // Send audio data every second if recording is ongoing
      
    return () => {
      clearInterval(timerId); // Cleanup on component unmount
    };
  }, [audioChunks, isRecording]);

  const startRecording = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      
      recorder.addEventListener('dataavailable', event => {
        console.log("data avail");
        setAudioChunks(prevChunks => [...prevChunks, event.data]); // Update chunks array with new data
      });
      
      
      recorder.start();
      setMediaRecorder(recorder);
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
