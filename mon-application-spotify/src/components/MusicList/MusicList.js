import React, { useState, useEffect } from 'react';
// import MusicPlayer from '../MusicPlayer/MusicPlayer';
import MusicControlBar from '../MusicControlBar/MusicControlBar';
import './MusicList.css';

function MusicList() {
    const [musics, setMusics] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);

        fetch('https://spotify-api-gules-two.vercel.app/api/musics')
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
            <div>
                {musics.map((music, index) => (
                    <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='musicList'>
                        <h4>{music.title}</h4>
                        <img src={music.imageUrl} alt={music.title} style={{ width: '100px', height: '100px' }} />
                        <span onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(music._id);
                        }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            {favorites.includes(music._id) ? '❤️' : '🤍'}
                        </span>
                    </div>
                ))}
            </div>
            <MusicControlBar
                music={musics}
                setCurrentMusicIndex={setCurrentMusicIndex}
                currentMusic={currentMusic}
                playNext={playNextMusic}
                playPrevious={playPreviousMusic}
            />
        </div>
    );
}

export default MusicList;
