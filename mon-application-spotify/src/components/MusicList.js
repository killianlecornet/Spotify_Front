import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import MusicControlBar from './MusicControlBar'; // Assurez-vous d'avoir créé ce composant

function MusicList() {
    const [musics, setMusics] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);

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

    const playNextMusic = () => {
        setCurrentMusicIndex(index => (index + 1) % musics.length);
    };
    
    const playPreviousMusic = () => {
        setCurrentMusicIndex(index => (index - 1 + musics.length) % musics.length);
    };
    

    const currentMusic = musics[currentMusicIndex];

    return (
        <div>
            <h1>Liste des Musiques</h1>
            {musics.map((music, index) => (
                <div key={music._id} onClick={() => setCurrentMusicIndex(index)}>
                    <h4>{music.title}</h4>
                    <span onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(music._id);
                    }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                        {favorites.includes(music._id) ? '❤️' : '🤍'}
                    </span>
                </div>
            ))}
            <MusicControlBar
                currentMusic={currentMusic}
                playNext={playNextMusic}
                playPrevious={playPreviousMusic}
            />
        </div>
    );
}

export default MusicList;
