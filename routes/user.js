const {MongoClient} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

const database = client.db('UserDB'); // Replace with your actual database name
const collection = database.collection('userlist');

const createNewUser = async (req, res) => {
    try {
        // Insert the new user into the collection
        const existingUser = await collection.findOne({username: req.body.username});
        console.log(existingUser);

        if (existingUser) {
            res.status(200).json({message: 'User already exists'});

        } else {
            await collection.insertOne(req.body);
            res.status(201).json({message: 'User created successfully'});
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const updateUser = async (req, res) => {
    try {

        const username = req.params.username;

        const result = await collection.updateOne({username: username}, {$set: req.body});

        if (result.modifiedCount === 1) {
            res.status(201).json({message: 'User updated successfully'});
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
const addWord = async (req, res) => {
    try {
        const username = req.params.username;
        const word = req.body.word;

        // Check if the word is null or undefined
        if (!word) {
            return res.status(400).json({ error: 'Word is required' });
        }

        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the word already exists in the user's words array
        if (user.words.includes(word)) {
            return res.status(400).json({ error: 'Word already exists for this user' });
        }

        // Update the user document in the MongoDB collection
        await collection.updateOne({ username: username }, { $push: { words: word } });

        res.status(201).json({ message: 'Word added successfully' });
    } catch (error) {
        console.error('Error adding word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Handler function to delete a word
const deleteWord = async (req, res) => {
    try {
        const username = req.params.username;
        const wordToDelete = req.params.word;

        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the word exists in the user's words array
        if (!user.words.includes(wordToDelete)) {
            return res.status(400).json({ error: 'Word does not exist for this user' });
        }

        // Update the user document in the MongoDB collection to remove the word
        await collection.updateOne({ username: username }, { $pull: { words: wordToDelete } });

        res.status(200).json({ message: 'Word deleted successfully' });
    } catch (error) {
        console.error('Error deleting word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    try {
        console.log("HELP!");
        const username = req.params.username;
        console.log(username);

        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



/*
const getFeelings = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await collection.findOne({username: username});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const userFeelings = user.feelings || [];

        res.status(200).json({username: user.username, feelings: userFeelings});
    } catch (error) {
        console.error('Error retrieving feelings:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }


};
*/

/*
const getAllActivities = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await collection.findOne({username: username});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const userActivities = user.activities || [];

        res.status(200).json({username: user.username, activities: userActivities});
    } catch (error) {
        console.error('Error retrieving activities:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


const getName = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await collection.findOne({username: username});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const userName = user.name || 'No Name'; // Assuming 'name' is a field in the user document

        res.status(200).json({username: user.username, name: userName});
    } catch (error) {
        console.error('Error retrieving user name:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};


const addActivity = async (req, res) => {
    try {
        const {username} = req.params;
        const {activityName, interval} = req.body;

        // Assuming you have a database model named User with an 'activities' field
        // where activities is an array of objects { name, type }
        const user = await collection.findOne({username});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Add the new activity to the user's activities array
        const newActivity = {
            name: activityName,
            type: interval,
        };

        // Use updateOne with filter and update operations
        await collection.updateOne(
            {username: username},
            {$push: {activities: newActivity}}
        );

        res.status(200).json({message: 'Activity added successfully', user});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

*/

module.exports = {
    createNewUser,
    updateUser,
    addWord,
    deleteWord,
    getUser
    //addFeelings,
    //getFeelings,
    //getName,
    //addActivity,
    //editActivity,
    //removeActivity,
    //getSoreArea, // possibly not working
    //getAllActivities
}
