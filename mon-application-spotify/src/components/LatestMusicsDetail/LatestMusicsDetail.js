import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';
import './LatestMusicsDetail.css';

function LatestMusics() {
    const [latestMusics, setLatestMusics] = useState([]);
    const [error, setError] = useState(null);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchLatestMusics = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URI_API}/api/musics/latest`);
                if (!response.ok) {
                    throw new Error('La récupération des dernières musiques a échoué.');
                }
                const data = await response.json();
                setLatestMusics(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des dernières musiques :', error);
                setError('Une erreur est survenue lors de la récupération des dernières musiques.');
            }
        };

        fetchLatestMusics();
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    const toggleFavorite = (music) => {
        const musicId = music._id;
        const updatedFavorites = favorites.includes(musicId)
            ? favorites.filter(id => id !== musicId)
            : [...favorites, musicId];

        setFavorites(updatedFavorites);

        // Sauvegarder les favoris dans le localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Stocker la musique dans le localStorage
        const allMusics = JSON.parse(localStorage.getItem('allMusics')) || [];
        const existingMusicIndex = allMusics.findIndex(existingMusic => existingMusic._id === musicId);

        if (existingMusicIndex !== -1) {
            // La musique est déjà dans le localStorage, mettez à jour les informations
            allMusics[existingMusicIndex] = music;
        } else {
            // La musique n'est pas encore dans le localStorage, ajoutez-la
            allMusics.push(music);
        }

        localStorage.setItem('allMusics', JSON.stringify(allMusics));
    };

    const playNextMusic = () => {
        setCurrentMusicIndex(index => (index + 1) % latestMusics.length);
    };

    const playPreviousMusic = () => {
        setCurrentMusicIndex(index => (index - 1 + latestMusics.length) % latestMusics.length);
    };

    const currentMusic = latestMusics[currentMusicIndex];

    return (
        <div className='mainInfosLatest'>
            <h1>Playlist Dynamique</h1>
            <div>
                {latestMusics.map((music, index) => (
                    <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='lastMusicList'>
                        <img loading="lazy" src={music.imageUrl} alt={music.title} />
                        <h3>{music.title}</h3>
                        <Link to={`/artist/${music.artist}`} key={music.artist?._id} className='link'>
                            <p>Artiste</p>
                        </Link>
                        <p className='link'>{music.genre}</p>
                        <span onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(music);
                        }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            {favorites.includes(music._id) ? '💚' : '🤍'}
                        </span>
                    </div>
                ))}
            </div>
            <MusicControlBar
                musics={latestMusics}
                setCurrentMusicIndex={setCurrentMusicIndex}
                currentMusic={currentMusic}
                playNext={playNextMusic}
                playPrevious={playPreviousMusic}
            />
        </div>
    );
}

export default LatestMusics;
