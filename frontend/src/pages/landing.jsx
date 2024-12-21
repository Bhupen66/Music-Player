import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import axios from 'axios'; // Add axios for API calls
import { motion } from 'framer-motion';
import * as THREE from 'three';

const LandingPage = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const threeRef = useRef(null);
  const sceneRef = useRef(null);
  const [musicData, setMusicData] = useState([]); // Ensure initial state is an empty array

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/music/music'); // Fetch music data from API
        if (response.data) {
          setMusicData(response.data); // Set the fetched data to state if it's defined
        } else {
          setMusicData([]); // Set to empty array if response.data is undefined
        }
      } catch (error) {
        console.error("Error fetching music data:", error);
        setMusicData([]); // Set to empty array on error
      }
    };

    fetchMusicData(); // Call the function to fetch data
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      return () => {
        if (audioRef.current) { // Check if audioRef.current is defined
          audioRef.current.removeEventListener('timeupdate', updateProgress);
        }
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeRef.current.appendChild(renderer.domElement);

    // Create a rotating glowing sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: isPlaying ? 0x00ff00 : 0xff0000, // Change color based on play/pause
      wireframe: true,
      opacity: 0.8,
      transparent: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += isPlaying ? 0.02 : 0.005; // Rotate faster when playing
      sphere.rotation.y += isPlaying ? 0.02 : 0.005;
      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { sphere, renderer, scene, camera };

    // Cleanup on component unmount
    return () => {
      if (threeRef.current) {
        threeRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isPlaying]);

  const playTrack = (track) => {
    if (currentTrack !== track) {
      setCurrentTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play();
      }
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white p-8 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 animate-pulse">
        Your Music Universe
      </h1>

      {/* 3D Background */}
      <div ref={threeRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></div>

      {/* Albums/Playlists Section */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
        {musicData && musicData.length > 0 ? ( // Check if musicData is defined and has items
          musicData.map(album => (
            <motion.div
              key={album.id}
              className="relative bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-opacity-20"
              whileHover={{ rotateY: 10, rotateX: 10 }}
            >
              <img 
                src={album.imageUrl} // Update to use imageUrl from the database
                alt={album.albumName} 
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-110 transition-transform duration-300"
              />
              <h2 className="text-2xl font-semibold mb-2 text-white">{album.albumName}</h2>
              <p className="text-gray-300 mb-4">{album.artist}</p>

              {/* Track List */}
              <ul>
                {album.tracks.map(track => (
                  <motion.li
                    key={track.id}
                    className={`mb-2 flex justify-between items-center p-2 rounded-lg ${
                      currentTrack === track ? "bg-green-600 text-white" : ""
                    }`}
                    whileTap={{ scale: 1.05 }}
                    whileHover={{ backgroundColor: "#222", scale: 1.02 }}
                  >
                    <span>{track.title}</span>
                    <motion.button
                      onClick={() => playTrack(track)}
                      className="text-green-400 hover:text-green-500 focus:outline-none transform transition-transform hover:scale-125"
                      whileTap={{ scale: 1.2, backgroundColor: "#00ff00", borderRadius: "50%" }}
                    >
                      {currentTrack === track && isPlaying ? <FaPause /> : <FaPlay />}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))
        ) : (
          <p className="text-white">No music data available.</p> // Fallback message
        )}
      </div>

      {/* Music Player */}
      {currentTrack && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-purple-800 py-4 px-6 flex justify-between items-center shadow-lg backdrop-blur-lg z-10"
        >
          <div>
            <p className="text-xl font-semibold">{currentTrack.title}</p>
            <p className="text-gray-300">{currentTrack.duration}</p>
            <div className="relative w-full h-1 bg-gray-500 mt-2">
              <div 
                className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div>
            <motion.button 
              onClick={() => playTrack(currentTrack)} 
              className="text-white transform transition-transform hover:scale-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default LandingPage;
