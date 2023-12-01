import React, { useState, useEffect } from 'react';
import MusicList from './components/MusicList';
import FavoritesPage from './components/FavoritesPage';

function App() {
    const [musics, setMusics] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/musics')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const toggleFavorite = (musicId) => {
        setFavorites(favorites.includes(musicId)
            ? favorites.filter(id => id !== musicId)
            : [...favorites, musicId]);
    };

    return (
        <div className="App">
            <h1>Application Spotify</h1>
            <MusicList musics={musics} toggleFavorite={toggleFavorite} favorites={favorites} />
            <FavoritesPage favorites={favorites} musics={musics} />
        </div>
    );
}

export default App;
