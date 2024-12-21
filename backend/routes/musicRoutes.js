// routes/musicRoutes.js

const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController"); // Import controller




// POST route for uploading music (with Multer for handling file uploads)

// GET route to retrieve all music data
router.get("/insert", musicController.getAllMusic); // Existing route
router.get("/music", musicController.getAllMusic); // New route to get all music

// POST route for inserting music data
router.post("/insert", (req, res) => {
  const { albumName, artist, producer, singer, composer, mp3Url, imageUrl  } = req.body; // Extract new data from request body
  if (!albumName || !artist || !producer || !singer || !composer || !mp3Url || !imageUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }
  musicController.insertMusic(req, res); // Call the controller method to handle insertion
});

module.exports = router;
