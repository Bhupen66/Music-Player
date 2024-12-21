import React from "react";
import Home from './pages/home';
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Route, Routes } from "react-router-dom";
import Home1 from './pages/homel'
import MusicLibrary from "./Components/MusicLibrary";
import AdminPanel from "./pages/admin";
import LandingPage from "./pages/landing";
import LibraryPage from "./pages/LibraryPage";

function App() {
  return (
    <>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home1 />} />
        <Route path="/library" element={<MusicLibrary />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
      </div>

    </>
  );
}

export default App;