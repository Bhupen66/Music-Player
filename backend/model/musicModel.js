// models/MusicModel.js

const mongoose = require('mongoose');

// Define the Music schema
const musicSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  composer: {
    type: String,
    required: true,
  },
  mp3Url: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// Create and export the Music model
const Music = mongoose.model('Music', musicSchema);
module.exports = Music;
