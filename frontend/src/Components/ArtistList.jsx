// src/ArtistList.jsx
import React from 'react';
import ArtistCard from './ArtistCard';

const artists = [
  {
    name: "Taylor Swift",
    genre: "Pop",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/07325980-f999-46d0-95a8-895d6469e9b4/d51ixbb-8e666c3d-86a0-494d-a258-c95c19196a14.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA3MzI1OTgwLWY5OTktNDZkMC05NWE4LTg5NWQ2NDY5ZTliNFwvZDUxaXhiYi04ZTY2NmMzZC04NmEwLTQ5NGQtYTI1OC1jOTVjMTkxOTZhMTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.oyFgfkSMsvZPjtxHjhR68-iBFts4gSsWPtBgZMPa4Zw",
  },
  {
    name: "Ed Sheeran",
    genre: "Pop/Rock",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/930546f4-22ae-4336-a5c6-6ba5d7f5f9b9/d8fo03b-8d6b7f26-4cc9-4c73-8dd4-28d456537df4.png/v1/fill/w_400,h_600/ed_sheeran_png_by_smilergorl00_d8fo03b-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvOTMwNTQ2ZjQtMjJhZS00MzM2LWE1YzYtNmJhNWQ3ZjVmOWI5XC9kOGZvMDNiLThkNmI3ZjI2LTRjYzktNGM3My04ZGQ0LTI4ZDQ1NjUzN2RmNC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.zMQkwlb9emzX9XRG5O86dMcW2emEvsEr65q9GeEuBO0",
  },
  {
    name: "Billie Eilish",
    genre: "Alternative",
    image: "https://www.pngplay.com/wp-content/uploads/6/Billie-Eilish-Singing-PNG-Clipart-Background.png",
  },
];

const ArtistList = () => {
  // Check if artists array is empty
  if (artists.length === 0) {
    return <div className="text-center text-red-500">Artist data not available</div>;
  }

  return (
    <div className="flex flex-wrap justify-center bg-gray-900 p-10">
      {artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;
