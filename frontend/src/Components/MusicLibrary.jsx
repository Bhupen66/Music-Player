// src/components/MusicLibrary.jsx

import React, { useState, useRef } from "react";
import { musicData } from "../data/musicData";

const MusicLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Filter albums by search term (by album name, artist, or track name)
  const filteredMusic = musicData.filter((album) =>
    album.albumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.tracks.some((track) =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Play track function
  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  // Pause track function
  const pauseTrack = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl text-white mb-4 font-bold">Music Library</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for albums, artists, or tracks..."
        className="w-full p-3 mb-8 text-black rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Album Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredMusic.length ? (
          filteredMusic.map((album) => (
            <div
              key={album.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:bg-gray-700 duration-300 perspective-1000"
            >
              <div className="relative h-full">
                <img
                  src={album.cover}
                  alt={album.albumName}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-xl text-white font-semibold mt-4">
                  {album.albumName}
                </h2>
                <p className="text-gray-400">{album.artist}</p>

                {/* Track Listings */}
                <div className="mt-4">
                  <h3 className="text-white font-medium text-lg">Tracks:</h3>
                  <ul className="text-gray-300 space-y-1">
                    {album.tracks.map((track) => (
                      <li
                        key={track.id}
                        className="flex justify-between items-center"
                      >
                        <span>{track.title}</span>
                        <div className="flex items-center space-x-2">
                          {currentTrack && currentTrack.id === track.id && isPlaying ? (
                            <button
                              onClick={pauseTrack}
                              className="bg-red-600 p-1 rounded-md"
                            >
                              Pause
                            </button>
                          ) : (
                            <button
                              onClick={() => playTrack(track)}
                              className="bg-green-600 p-1 rounded-md"
                            >
                              Play
                            </button>
                          )}
                          <span>{track.duration}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No results found.</p>
        )}
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default MusicLibrary;
