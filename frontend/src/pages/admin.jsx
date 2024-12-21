// src/components/AdminPanel.jsx

import React, { useState } from "react"; 

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    albumName: "",
    artist: "",
    producer: "",
    singer: "",
    composer: "",
    mp3Url: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    try {
      
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify(formData);
       
       let response = await fetch("http://localhost:5000/api/music/insert", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       console.log(response);
       

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Upload success:", responseData);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-3xl mb-6 font-bold">Admin Panel - Upload Music</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Album Name */}
        <input
          type="text"
          name="albumName"
          placeholder="Album Name"
          className="w-full p-2 text-black rounded"
          value={formData.albumName}
          onChange={handleInputChange}
          required
        />

        {/* Artist */}
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          className="w-full p-2 text-black rounded"
          value={formData.artist}
          onChange={handleInputChange}
          required
        />

        {/* Producer */}
        <input
          type="text"
          name="producer"
          placeholder="Producer"
          className="w-full p-2 text-black rounded"
          value={formData.producer}
          onChange={handleInputChange}
          required
        />

        {/* Singer */}
        <input
          type="text"
          name="singer"
          placeholder="Singer"
          className="w-full p-2 text-black rounded"
          value={formData.singer}
          onChange={handleInputChange}
          required
        />

        {/* Composer */}
        <input
          type="text"
          name="composer"
          placeholder="Composer"
          className="w-full p-2 text-black rounded"
          value={formData.composer}
          onChange={handleInputChange}
          required
        />

        {/* Upload MP3 File */}
        <input
          type="text"
          name="mp3Url"
          className="w-full p-2 text-white rounded bg-gray-800"
          onChange={handleInputChange}
          required
        />

        {/* Upload Album Image */}
        <input
          type="text"
          name="imageUrl"
          className="w-full p-2 text-white rounded bg-gray-800"
          onChange={handleInputChange}
          required
        />

        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          Upload Music
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
