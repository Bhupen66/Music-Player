// src/HomePage.js
import React from 'react';
import { FaBullseye, FaLightbulb, FaHeart } from "react-icons/fa";
import ArtistSlider from '../Components/ArtistSlider';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {

  const navigate = useNavigate();
  const login = () => {
    navigate('/login')
  }

  const Signup = () => {
    navigate('/Signup')
  }

  // New function to scroll to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Show toast notification on successful form submission
    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Reset the form if needed
    e.target.reset();
  };

  return (

    <div className="home-page bg-gray-100 min-h-screen flex flex-col">
      <nav className="bg-opacity-80 h-32 w-full">
        <div className="w-full px-8 py-5 bg-white flex justify-between items-center transition duration-200">
          <div className="logo">
            <button>
              <img className="w-20 h-20" src="https://static.vecteezy.com/system/resources/thumbnails/010/063/510/small/music-festival-colorful-icon-with-notes-and-the-inscription-music-3d-render-png.png" alt="logo" />
            </button>
          </div>
          <div className="flex gap-10 justify-center text-white">
            <button onClick={() => scrollToSection('home')} className="hover:text-orange-200 text-black rounded-md transition duration-200">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-orange-200 text-black rounded-md transition duration-200">About</button>
            <button onClick={() => scrollToSection('artist')} className="hover:text-orange-200 text-black rounded-md transition duration-200">Artist List</button>
            <button onClick={() => scrollToSection('contac')} className="hover:text-orange-200 text-black rounded-md transition duration-200">Contact</button>
          </div>
          <div className="flex gap-8 h-10">
            <button
              onClick={Signup}
              className="flex text-2xl rounded-md transition duration-200 hover:text-white"
            >
              Register
            </button>
            <button
              onClick={login}
              className="flex text-2xl hover:text-white rounded-md transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section className="home-section p-6 h-screen w-full bg-white shadow-md mt-4 overflow-hidden" id='home'>
        <section className="home-section p-6 h-screen w-full bg-white shadow-md mt-4 overflow-hidden" id='home'>
          <div className="relative h-screen bg-gradient-to-r from-blue-500 to-transparent flex items-center justify-center">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm" style={{ backgroundImage: "url('your-background-image.jpg')" }}></div>
            </div>

            <div className="z-10 text-center p-10 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Welcome to Your Dream Space
              </h1>
              <p className="text-lg md:text-2xl text-white mb-8 drop-shadow-md">
                Discover, explore, and immerse yourself in a world of creativity and innovation.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* 3D Floating Cards */}
            <div className="absolute top-10 left-20 w-40 h-40 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 ease-out">
              <img
                src="https://pics.clipartpng.com/Red_Electric_Guitar_PNG_Clipart-894.png"
                alt="img"
                className="object-cover mb-4 rounded-md transition duration-300 hover:opacity-90"
              />
            </div>
            <div className="absolute bottom-10 right-20 w-60 h-60 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 ease-out"></div>
          </div>
        </section>
      </section>

      {/* Artist List Section */}
      <section id='artist'>
        <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 text-white overflow-hidden">
          <h1 className="text-center text-4xl font-bold py-10">Artist List</h1>
          <ArtistSlider />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r w-full h-screen from-blue-900 via-purple-900 to-blue-900 text-white py-16" id='about'>
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
            About Us
          </h2>
          <p className="text-lg mb-12 px-8">
            Our goal is to connect the world through music, providing an unmatched
            experience that fuels creativity, passion, and connection.
          </p>

          {/* 3D Card Section */}
          <div className="flex justify-center gap-12 flex-wrap">
            {/* Card 1 */}
            <div className="group perspective-500 hover:scale-105 transition-transform duration-500">
              <div className="relative w-72 h-96 bg-gray-800 text-center rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6">
                <div className="p-8">
                  <FaBullseye className="text-6xl mb-4 text-pink-500" />
                  <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-gray-300">
                    To connect people through the power of music and provide an
                    immersive experience.
                  </p>
                </div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-pink-500 to-yellow-500"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group perspective-500 hover:scale-105 transition-transform duration-500">
              <div className="relative w-72 h-96 bg-gray-800 text-center rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6">
                <div className="p-8">
                  <FaLightbulb className="text-6xl mb-4 text-yellow-500" />
                  <h3 className="text-3xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-gray-300">
                    A world where music brings everyone together and inspires
                    creativity in all its forms.
                  </p>
                </div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-green-500"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group perspective-500 hover:scale-105 transition-transform duration-500">
              <div className="relative w-72 h-96 bg-gray-800 text-center rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6">
                <div className="p-8">
                  <FaHeart className="text-6xl mb-4 text-red-500" />
                  <h3 className="text-3xl font-semibold mb-4">Our Values</h3>
                  <p className="text-gray-300">
                    Creativity, innovation, and a passion for making a difference
                    in the music industry.
                  </p>
                </div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-red-500 to-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contac'>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500">
          <div className="bg-gray-800 p-28 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center text-white mb-6">Contact Us</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 text-lg">Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-lg">Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-lg">Message</label>
                <textarea
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;












