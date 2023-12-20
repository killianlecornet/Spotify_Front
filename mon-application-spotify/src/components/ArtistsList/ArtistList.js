import React, { useState, useEffect } from 'react';

function ArtistsList({ onSelectArtist }) {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetch('https://spotify-api-gules-two.vercel.app/api/musics/artists') // URL pour récupérer les artistes
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <div>
            <h2>Liste des Artistes</h2>
            {artists.map((artist, index) => (
                <div key={index} onClick={() => onSelectArtist(artist)}>
                    {artist}
                </div>
            ))}
        </div>
    );
}

export default ArtistsList;
