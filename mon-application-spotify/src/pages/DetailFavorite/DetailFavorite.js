import React, { useState, useEffect } from 'react';
import './DetailFavorite.css';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';

function DetailFavorite() {
    const [allMusics, setAllMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);

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
