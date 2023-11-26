import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer'; // Assurez-vous d'avoir ce composant

function MusicList() {
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        // Remplacer par l'URL de votre API
        fetch('http://localhost:3000/api/musics')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <div>
            <h1>Liste des Musiques</h1>
            {musics.map(music => (
                <MusicItem key={music._id} music={music} />
            ))}
        </div>
    );
}

function MusicItem({ music }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h3 onClick={() => setShowDetails(!showDetails)}>{music.title}</h3>
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
