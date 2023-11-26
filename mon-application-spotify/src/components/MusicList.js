import React, { useState, useEffect } from 'react';

function MusicList() {
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/musics')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <div>
            {musics.map(music => (
                <div key={music._id}>
                    <h3>{music.title}</h3>
                    <p>{music.artist}</p>
                </div>
            ))}
        </div>
    );
}

export default MusicList;
