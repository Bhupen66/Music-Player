// controllers/musicController.js
const Music = require('../model/musicModel');// Import the Music model

// Upload Music Function (called by route)
exports.uploadMusic = async (req, res) => {
  try {
    const { albumName, artist, producer, singer, composer, mp3Url, imageUrl } = req.body; // Ensure all fields are captured
    
    // Create new music entry in the database
    const newMusic = new Music({
      albumName,
      artist,
      producer,
      singer,
      composer,
      mp3Url,
      imageUrl,
    });

    // Save to database
    await newMusic.save();

    res.status(201).json({ message: "Music uploaded successfully!", music: newMusic });
  } catch (error) {
    console.error(error);
    // Improved error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error", error });
    }
    res.status(500).json({ message: "Server error. Could not upload music.", error });
  }
};

// Get All Music Function
exports.getAllMusic = async (req, res) => {
  try {
    const musicList = await Music.find(); // Retrieve all music entries from MongoDB
    res.status(200).json(musicList);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve music", error });
  }
};

// Insert Music Function (newly added)
exports.insertMusic = async (req, res) => {
  try {
    const { albumName, artist, producer, singer, composer, mp3Url, imageUrl } = req.body; // Extract mp3Url and imageUrl from request body

    // Validate required fields
    if (!albumName || !artist || !producer || !singer || !composer || !mp3Url || !imageUrl) {
      return res.status(400).json({ message: "mp3Url and imageUrl are required." });
    }

    // Call the uploadMusic function to handle the actual upload
    await this.uploadMusic(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Could not insert music.", error });
  }
};
