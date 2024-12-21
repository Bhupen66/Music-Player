// src/ArtistCard.jsx
import React from 'react';

const ArtistCard = ({ artist }) => {
  // Check if artist is defined
  if (!artist) {
    return <div className="text-center text-red-500">Artist data not available</div>;
  }

  return (
    <div className="relative group w-40 h-40 rounded-full m-4">
      <div className="absolute inset-0    rounded-lg shadow-lg transform transition-transform group-hover:rotate-3 group-hover:scale-105"></div>
      <div className="relative bg-white p-4 rounded-full w-40 h-40 shadow-lg transform transition-transform group-hover:rotate-2 group-hover:scale-105">
        <img
          src={artist.image}
          alt={artist.name}
          className="rounded-full w-full h-full mx-auto mb-3"
        />
        <h3 className="text-center font-bold text-lg">{artist.name}</h3>
        <p className="text-center text-sm text-gray-500">{artist.genre}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
