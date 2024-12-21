// src/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sample data for playlists
const playlists = [
  {
    title: 'Top Hits',
    image: 'https://d3wo5wojvuv7l.cloudfront.net/t_square_limited_480/images.spreaker.com/original/3cab2679948a0c595be4698d01287c97.jpg',
  },
  {
    title: 'Chill Vibes',
    image: 'https://c8.alamy.com/zooms/9/fea52cd0567241618d28f3bbbe97e1aa/2h31w35.jpg',
  },
  {
    title: 'Workout Mix',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT51BXBn_xdTNbaXNLoFX2ice5Ccz0GX6-HJg&s',
  },
  {
    title: 'Party Hits',
    image: 'https://images.unsplash.com/photo-1555964429-aa57dde28223',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  // Navigation to Library
  const goToLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-5 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wider">🎶 Music Player</h1>
        <div className="space-x-4">
          <button className="hover:text-green-500 transition-colors duration-200">Home</button>
          <button onClick={goToLibrary} className="hover:text-green-500 transition-colors duration-200">Library</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-20 bg-gradient-to-r from-green-500 to-blue-500 shadow-md rounded-lg">
        <h2 className="text-6xl font-bold mb-6 animate-bounce">Welcome to the Music World</h2>
        <p className="text-lg">Listen to your favorite songs, anytime, anywhere.</p>
        <button
          onClick={goToLibrary}
          className="mt-6 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Explore Library
        </button>
      </header>

      {/* Featured Playlists */}
      <section className="p-5">
        <h3 className="text-4xl font-extrabold mb-6">Featured Playlists</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={playlist.image}
                alt={playlist.title}
                className="w-full h-40 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-all duration-300"
                  onClick={() => navigate(`/playlist/${index}`)}
                >
                  ▶️ View
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg">{playlist.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-5 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Music Player. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
