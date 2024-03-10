const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const {MongoClient} = require("mongodb");
const user = require("./routes/user.js");
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Middleware to parse FormData
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files


app.use(express.json());
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  


const publicVapidKey =
  "BJ8NBEgdl89k71YbzUGwKAYdbZF97XobHNUlNiX8xjDD5YEHkXxbv_JrC7pgkPAZkiFtdqy6EY7JKmn9NQJcitY";
const privateVapidKey = "3AysE1150GFoHijLeC3mmJGftO0cZGROeSiTalMiSpE";

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  );

  // Enable CORS for specific origins
const allowedOrigins = ['http://localhost:3001', 'http://example.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


  

  // Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.use(express.static('public'));




//const user = require('./routes/user.js');



app.get('/', async (req, res) => {
    res.send('Hello, this is your website!');
});

app.post('/db/userlist', user.createNewUser);
app.put('/db/userlist/:username', user.updateUser);

app.post('/db/userlist/:username/', user.addWord);

app.delete('/db/userlist/:username/:word', user.deleteWord);

// Define the route for getting a user
app.get('/db/userlist/:username', user.getUser);


/*
app.post('/db/userlist/:username/feelings', user.addFeelings);
app.get('/db/userlist/:username/name', user.getName);
app.get('/db/userlist/:username/feelings', user.getFeelings);

// working
app.post('/db/userlist/:username/activity', user.addActivity);
// everything followed by the colon is a parameter, things in the json are the body

// editActivity:
// issue: some activities have multiple words, but the endpoint URL only accepts one continous word for the activity
// OK: ".../exampleUser/activity"
// NOT OK: ".../exampleUser/multiple word activity"
// this is working for single word activities only
app.put('/db/userlist/:username/:activity', user.editActivity);
app.delete('/db/userlist/:username/:activity', user.removeActivity);
app.get('/db/userlist/:username', user.getAllActivities);

app.get('/db/userlist/:username/:soreArea', user.getSoreArea);
*/

// Start the server after connecting to the database
async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1); // Terminate the process if unable to connect to the database
    }
  }
  
  /*
  app.get('/', async (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });
    
    // Start the server after connecting to the database
    connectToDatabase().then(() => {
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    });
    */

    app.get('/', async (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
    
    // Endpoint for handling audio data from the client
// Existing server code


/*
app.post('/audio', upload.single('audio'), (req, res) => {
    const audioData = req.file; // Access the uploaded file from req.file
    // Process the audio data as needed (e.g., save to disk, perform speech-to-text conversion)
    // For demonstration purposes, let's log the size of the audio data

    console.log('Received audio data:', audioData);
    res.sendStatus(200); // Send a success response back to the client
});
*/

// Endpoint for receiving audio data from the client

app.post('/audio', upload.single('audio'), (req, res) => {
    const audioFile = req.file; // Access the uploaded file from req.file

    console.log(audioFile);

    // Check if an audio file was uploaded
    if (!audioFile) {
        return res.status(400).json({ error: 'No audio file uploaded' });
    }

    // Define the destination folder for recordings
    const recordingsFolder = path.join(__dirname, 'recordings');

    // Create the recordings folder if it doesn't exist
    if (!fs.existsSync(recordingsFolder)) {
        fs.mkdirSync(recordingsFolder);
    }

// Generate a unique filename using a timestamp
const timestamp = Date.now(); // Get current timestamp
const newFileName = `audio_${timestamp}.wav`; // Example: audio_1631060181000.wav

// Define the path for the new audio file
const newFilePath = path.join(recordingsFolder, newFileName);

    // Move the uploaded audio file to the recordings folder
    fs.renameSync(audioFile.path, newFilePath);

    console.log('Audio file saved:', newFilePath);
    res.sendStatus(200); // Send a success response back to the client
});

// Define storage for audio files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/audio_clips');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

// Initialize multer upload middleware
const upload1 = multer({ storage: storage });

// POST endpoint to upload audio file for a user
app.post('/db/userlist/:username/audio', upload1.single('audioFile'), (req, res) => {
  try {
    const username = req.params.username;
    const audioFile = req.file;

    // Check if the audio file was uploaded
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    // Return success response
    res.status(200).json({ message: 'Audio file uploaded successfully' });
  } catch (error) {
    console.error('Error uploading audio file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server after connecting to the database
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});

    
