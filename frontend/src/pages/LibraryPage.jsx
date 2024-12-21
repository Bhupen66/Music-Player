// src/LandingPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

// Sample data for initial playlists
const initialPlaylists = [
    {
        title: 'Top Hits',
        image: 'https://d3wo5wojvuv7l.cloudfront.net/t_square_limited_480/images.spreaker.com/original/3cab2679948a0c595be4698d01287c97.jpg',
        songs: [
            { title: 'Song 1', url: 'hhttps://jmp.sh/s/02Xw8jVGJ2GcnNBUDyum' },
            { title: 'Song 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        ]
    },
    {
        title: 'Chill Vibes',
        image: 'https://c8.alamy.com/zooms/9/fea52cd0567241618d28f3bbbe97e1aa/2h31w35.jpg',
        songs: [
            { title: 'Song 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
            { title: 'Song 4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
        ]
    },
    {
        title: 'Workout Mix',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT51BXBn_xdTNbaXNLoFX2ice5Ccz0GX6-HJg&s',
        songs: [
            { title: 'Song 5', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
            { title: 'Song 6', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
        ]
    },
];

const LandingPage = () => {
    const [playlists] = useState(initialPlaylists);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Handle Play Song
    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    // Toggle Play/Pause
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Stop song
    const stopSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setProgress(0);
        }
    };

    // Update Progress Bar
    const updateProgress = () => {
        if (audioRef.current) {
            const { currentTime, duration } = audioRef.current;
            setProgress((currentTime / duration) * 100);
        }
    };

    // Seek in the audio track
    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setProgress(e.target.value);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    // Combine songs from all playlists for searching
    const allSongs = playlists.flatMap(playlist => playlist.songs);

    // Filter songs based on search term
    const filteredSongs = allSongs.filter(song =>
        song.title && typeof song.title === 'string' && song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <h1 className="text-4xl text-center pt-10">Music Library</h1>
            <div className="grid grid-cols-3 gap-4 p-10">
                {playlists.map((playlist, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-4">
                        <h2 className="text-2xl text-center mb-4">{playlist.title}</h2>
                        <img src={playlist.image} alt={playlist.title} className="w-full h-48 object-cover mb-4" />
                        {playlist.songs.map((song, idx) => (
                            <div key={idx} className="flex justify-between items-center mb-2">
                                <span>{song.title}</span>
                                <button
                                    onClick={() => playSong(song)}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Play
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Now Playing Section */}
            {currentSong && (
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-center shadow-lg rounded-lg mt-6">
                    <h3 className="text-3xl font-bold">Now Playing: {currentSong.title}</h3>

                    {/* Audio Controls */}
                    <audio
                        ref={audioRef}
                        src={currentSong.url}
                        autoPlay
                        onEnded={stopSong}
                        onError={(e) => console.error('Error playing audio:', e)}
                    ></audio>

                    <div className="flex items-center justify-center mt-6 space-x-6">
                        <button
                            onClick={togglePlayPause}
                            className="bg-green-500 p-3 rounded-full text-white shadow-lg hover:bg-green-600 transition-colors duration-300"
                        >
                            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                        </button>
                        <button
                            onClick={stopSong}
                            className="bg-red-500 p-3 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors duration-300"
                        >
                            <FaStop size={24} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mt-4 w-full flex items-center justify-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="appearance-none w-2/3 h-2 bg-transparent"
                            style={{
                                background: `linear-gradient(to right, #34D399 ${progress}%, #374151 ${progress}%)`,
                            }}
                        />
                        <div
                            className="absolute -top-3 left-1/3 text-gray-300 text-sm transition-opacity duration-300"
                            style={{ opacity: progress > 0 ? 1 : 0 }}
                        >
                            {Math.floor((audioRef.current?.currentTime || 0) / 60)}:
                            {Math.floor((audioRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')}
                        </div>
                    </div>

                    {/* Time Display */}
                    <div className="text-gray-400 mt-2 text-sm">
                        {Math.floor((audioRef.current?.currentTime || 0) / 60)}:
                        {Math.floor((audioRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')} /{' '}
                        {Math.floor((audioRef.current?.duration || 0) / 60)}:
                        {Math.floor((audioRef.current?.duration || 0) % 60).toString().padStart(2, '0')}
                    </div>
                </div>
            )}

            <div className="p-10">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a song"
                    className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <ul className="mt-4">
                    {filteredSongs.map((song, index) => (
                        <li key={index} className="mb-2">{song.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LandingPage;