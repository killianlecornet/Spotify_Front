import React, { useState, useEffect } from 'react';
import './DetailFavorite.css';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';

function DetailFavorite() {
    const [allMusics, setAllMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Charger toutes les musiques depuis le localStorage
        const storedMusics = JSON.parse(localStorage.getItem('allMusics')) || [];
        setAllMusics(storedMusics);
    }, []);

    const playNextMusic = () => {
        setCurrentMusicIndex(index => (index + 1) % allMusics.length);
    };

    const playPreviousMusic = () => {
        setCurrentMusicIndex(index => (index - 1 + allMusics.length) % allMusics.length);
    };

    const currentMusic = allMusics[currentMusicIndex];

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
            // La musique est déjà dans le localStorage, supprimez-la
            allMusics.splice(existingMusicIndex, 1);
            localStorage.setItem('allMusics', JSON.stringify(allMusics));
        } else {
            // La musique n'est pas encore dans le localStorage, ajoutez-la
            allMusics.push(music);
            localStorage.setItem('allMusics', JSON.stringify(allMusics));
        }
    
        // Recharger la page
        window.location.reload();
    };
    
    

    return (
        <div className='App'>
            <LeftNavbar />
            <div className='mainInfos'>
                <h1>Coups de coeur</h1>
                {allMusics.length > 0 ? (
                    allMusics.map((music, index) => (
                        <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='favoriteList'>
                            <img src={music.imageUrl} alt={music.title} />
                            <h3>{music.title}</h3>
                            <p>{music.genre}</p>
                            <span onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(music);
                            }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                {favorites.includes(music._id) ? '🤍' : '❤️'}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>Aucune musique n'a été trouvée.</p>
                )}
                <MusicControlBar
                    currentMusic={currentMusic}
                    playNext={playNextMusic}
                    playPrevious={playPreviousMusic}
                />
            </div>
        </div>
    );
}

export default DetailFavorite;
