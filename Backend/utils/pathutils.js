import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let _db;

// Use environment variable for the MongoDB URL
const mongoUrl = process.env.MONGO_URL;

// Function to connect to MongoDB
const mongoconnect = async (callback) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    console.log("MongoDB connected successfully");
    _db = client.db("form"); // choose your database
    callback(); // call the callback after connection
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
  }
};

// Function to get the database instance
const getdb = () => {
  if (!_db) {
    throw new Error('MongoDB not connected properly');
  }
  return _db;
};

// Export functions
export { mongoconnect, getdb };
