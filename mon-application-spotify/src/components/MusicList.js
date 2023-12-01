import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer'; // Assurez-vous que ce composant existe

function MusicList() {
    const [musics, setMusics] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);

        fetch('http://localhost:3001/api/musics')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const toggleFavorite = (musicId) => {
        const updatedFavorites = favorites.includes(musicId)
            ? favorites.filter(id => id !== musicId)
            : [...favorites, musicId];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h1>Liste des Musiques</h1>
            {musics.map(music => (
                <MusicItem 
                    key={music._id} 
                    music={music} 
                    isFavorite={favorites.includes(music._id)}
                    toggleFavorite={toggleFavorite} 
                />
            ))}
        </div>
    );
}

function MusicItem({ music, isFavorite, toggleFavorite }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleFavoriteClick = (event) => {
        event.stopPropagation();
        toggleFavorite(music._id);
    };

    return (
        <div>
            <h4 onClick={() => setShowDetails(!showDetails)}>
                {music.title}
                <span onClick={handleFavoriteClick} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    {isFavorite ? '❤️' : '🤍'}
                </span>
            </h4>
            {showDetails && (
                <div>
                    <p>{music.artist}</p>
                    <MusicPlayer url={music.url} />
                </div>
            )}
        </div>
    );
}

export default MusicList;
