import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer'; // Assurez-vous que ce composant existe et fonctionne correctement

function MusicList() {
    const [musics, setMusics] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [currentMusicUrl, setCurrentMusicUrl] = useState('');

    useEffect(() => {
        // Remplacer par l'URL de votre API
        fetch('http://localhost:3001/api/musics')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const groupByArtist = (musicsArray) => {
        return musicsArray.reduce((acc, music) => {
            acc[music.artist] = [...(acc[music.artist] || []), music];
            return acc;
        }, {});
    };

    const musicsByArtist = groupByArtist(musics);

    const handleMusicClick = (url) => {
        setCurrentMusicUrl(url);
    };

    return (
        <div>
            <h1>Liste des Artistes</h1>
            {selectedArtist === null ? (
                Object.keys(musicsByArtist).map(artist => (
                    <h3 key={artist} onClick={() => setSelectedArtist(artist)}>
                        {artist}
                    </h3>
                ))
            ) : (
                <div>
                    <button onClick={() => setSelectedArtist(null)}>Retour</button>
                    <h2>Musiques de {selectedArtist}</h2>
                    {musicsByArtist[selectedArtist].map(music => (
                        <div key={music._id}>
                            <h4 onClick={() => handleMusicClick(music.url)}>{music.title}</h4>
                        </div>
                    ))}
                </div>
            )}

            {currentMusicUrl && <MusicPlayer url={currentMusicUrl} />}
        </div>
    );
}

export default MusicList;
