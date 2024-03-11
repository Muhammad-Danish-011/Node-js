const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const database = 'local';
const client = new MongoClient(url);

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}
connectToMongoDB();

// Route to get all data
app.get('/get', async (req, res) => {
  try {
    const db = client.db(database);
    const collection = db.collection('data');

    // Retrieve all data from the collection
    const data = await collection.find({}).toArray();

    // Send a response
    res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to post data
app.post('/post', async (req, res) => {
  try {
    const db = client.db(database);
    const collection = db.collection('data');

    // Extract data from request body
    const postData = req.body;

    // Insert data into the collection
    const result = await collection.insertOne(postData);

    // Send a response
    res.status(201).send(result.ops); // Return the inserted document(s)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete data by ID
app.delete('/delete/:id', async (req, res) => {
  try {
    const db = client.db(database);
    const collection = db.collection('data');

    // Extract the ID from the request parameters
    const id = req.params.id;

    // Convert the ID to ObjectId
    const objectId = new ObjectId(id);

    // Delete the document by ID
    const result = await collection.deleteOne({ _id: objectId });

    // Send a response
    res.send({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deleteAll', async (req, res) => {
    try {
      const db = client.db(database);
      const collection = db.collection('data');
  
      // Delete the document by ID
      const result = await collection.deleteMany();
  
      // Send a response
      res.send({ deletedCount: result.deletedCount });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
